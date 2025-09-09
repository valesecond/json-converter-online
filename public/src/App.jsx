import { useState } from "react";
import {
  jsonToCsv,
  csvToJson,
  jsonToYaml,
  yamlToJson,
  jsonToSql,
} from "./converters";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("jsonToCsv");

  const handleConvert = () => {
    let result = "";
    switch (format) {
      case "jsonToCsv":
        result = jsonToCsv(input);
        break;
      case "csvToJson":
        result = csvToJson(input);
        break;
      case "jsonToYaml":
        result = jsonToYaml(input);
        break;
      case "yamlToJson":
        result = yamlToJson(input);
        break;
      case "jsonToSql":
        result = jsonToSql(input);
        break;
      default:
        result = "Selecione uma conversão";
    }
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("✅ Copiado para clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700">
          🌐 JSON Converter Online
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Converta entre <strong>JSON, CSV, YAML e SQL</strong> rapidamente
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full md:w-1/2"
          >
            <option value="jsonToCsv">JSON → CSV</option>
            <option value="csvToJson">CSV → JSON</option>
            <option value="jsonToYaml">JSON → YAML</option>
            <option value="yamlToJson">YAML → JSON</option>
            <option value="jsonToSql">JSON → SQL</option>
          </select>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleConvert}
              className="bg-blue-500 text-white px-6 py-2 md:py-3 rounded-lg hover:bg-blue-600 transition shadow-md flex-1"
            >
              Converter
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 md:py-3 rounded-lg hover:bg-red-600 transition shadow-md flex-1"
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-[210px] overflow-hidden">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole seu conteúdo aqui..."
            className="w-full p-4 border border-gray-300 rounded-lg h-full resize-none shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none overflow-auto"
          />
          <textarea
            value={output}
            readOnly
            placeholder="Resultado aparecerá aqui..."
            className="w-full p-4 border border-gray-300 rounded-lg h-full resize-none bg-gray-50 shadow-sm overflow-auto font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          >
            Copiar
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition shadow-md"
          >
            Baixar
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Desenvolvido por Francisco Fernandes • Open Source
        </p>
      </div>
    </div>
  );
}

export default App;
