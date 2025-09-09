import Papa from "papaparse";
import yaml from "js-yaml";

// Helper: transforma objetos internos em string JSON
function flattenObjects(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      result[key] = JSON.stringify(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

// JSON -> CSV
export function jsonToCsv(json) {
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return "Erro: precisa ser um array de objetos";
    const flatArr = arr.map(flattenObjects);
    return Papa.unparse(flatArr);
  } catch {
    return "Erro: JSON inválido";
  }
}

// CSV -> JSON
export function csvToJson(csv) {
  try {
    const result = Papa.parse(csv, { header: true });
    const data = result.data.map((row) => {
      const newRow = { ...row };
      // tenta transformar o campo 'enderecos' em array novamente
      if (row.enderecos) {
        try {
          newRow.enderecos = JSON.parse(row.enderecos);
        } catch {
          // mantém como string se não for JSON válido
        }
      }
      // tenta converter 'ativo' em boolean
      if (row.ativo === "true") newRow.ativo = true;
      if (row.ativo === "false") newRow.ativo = false;
      // tenta converter 'idade' em number
      if (!isNaN(row.idade)) newRow.idade = Number(row.idade);

      return newRow;
    });

    return JSON.stringify(data, null, 2);
  } catch {
    return "Erro: CSV inválido";
  }
}

// JSON -> YAML
export function jsonToYaml(json) {
  try {
    return yaml.dump(JSON.parse(json));
  } catch {
    return "Erro: JSON inválido";
  }
}

// YAML -> JSON
export function yamlToJson(yml) {
  try {
    return JSON.stringify(yaml.load(yml), null, 2);
  } catch {
    return "Erro: YAML inválido";
  }
}

// JSON -> SQL (PostgreSQL/MySQL compatível)
export function jsonToSql(json) {
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return "Erro: precisa ser um array de objetos";

    const table = "my_table";

    const inserts = arr.map((row) => {
      const keys = Object.keys(row);
      const values = keys
        .map((k) => {
          const val = row[k];

          // números
          if (typeof val === "number") return val;

          // booleanos
          if (typeof val === "boolean") return val ? "TRUE" : "FALSE";

          // objetos/arrays → JSON string escapada
          if (typeof val === "object" && val !== null) {
            return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
          }

          // string normal → escapada
          return `'${String(val).replace(/'/g, "''")}'`;
        })
        .join(", ");

      return `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values});`;
    });

    return inserts.join("\n");
  } catch {
    return "Erro: JSON inválido";
  }
}
