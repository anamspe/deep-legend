import { useRef, useState } from "react";
import FileUpload from "./FileUpload";
import { parseSRT } from "../utils/parseSRT";
import { translateSubtitles } from "../api/translate";
import { buildSRT } from "../utils/buildSRT";
import { supportedLanguages } from "../utils/languages";

const TextAreaPanel = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  // const [inputLang, setInputLang] = useState("auto"); // auto = auto-detect
  const [outputLang, setOutputLang] = useState("PT-BR") // default language: Brazilian Portuguese
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();

  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleClear = () => {
    setInputText(""); // Clear the input text area
    setOutputText(""); // Clear the output text area
    setFileName(""); // Clear file name
    setSubtitles([]); // Clear subtitle state to reset translate button
  };

  const handleFileLoad = (text, name) => {
    setInputText(text);
    setFileName(name);

    const parsedSubtitles = parseSRT(text);
    setSubtitles(parsedSubtitles);
    console.log("Subtitles in state:", parsedSubtitles);
  };

  // const handleSubtitleChange = (index, newText) => {
  //   const updated = [...subtitles];
  //   updated[index].text = newText
  //   setSubtitles(updated);
  // }

  const handleTranslate = async () => {
    if (!subtitles || subtitles.length === 0) return;
    setShowDownloadButton(false);

    const linesToTranslate = subtitles.map(s => s.text);
    const translatedLines = await translateSubtitles(linesToTranslate, "pt-BR");

    const updatedSubtitles = subtitles.map((s, index) => ({
      ...s,
      translation: translatedLines[index],
    }));

    const outputSRT = buildSRT(updatedSubtitles)
    setOutputText(outputSRT);

    // Wait 2s before showing download button
    setTimeout(() => {
      setShowDownloadButton(true);
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "translated_subtitle.srt";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Captions Translator
      </h1>
      <p className="text-gray-600 text-center mb-4">
        Paste your subtitle text below or upload a file to translate it.
      </p>

      <div className="grid grid-cols-4 mb-4">
        <div className="col-span-3">
          <FileUpload onFileLoaded={handleFileLoad} ref={fileInputRef} />
        </div>
        <button
          className="justify-self-end self-center w-30 h-10 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 ml-4"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>
      </div>
      <div className="flex gap-20 justify-between mb-2">
        <p className="self-end text-xs text-gray-500 ml-1">Language will be auto-detected</p>
        <select
          value={outputLang}
          onChange={(e) => setOutputLang(e.target.value)}
          className="w-l p-2 border border-gray-300 rounded bg-neutral-50"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <span className="flex flex-1 flex-col relative">
        <textarea
          className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-md resize-none h-72"
          placeholder="Paste subtitle text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          readOnly
          />
        {fileName && (
          <p className="mt-2 text-sm text-gray-600 absolute -bottom-7 left-0">
            📝 File selected: <span className="font-medium text-blue-600 opacity-80">{fileName}</span>
          </p>
        )}
        </span>
        <i className="fa-solid fa-right-left self-center text-2xl text-cyan-600"></i>
        <textarea
          className="flex-1 p-4 border border-gray-200 rounded-md resize-none h-72"
          placeholder="Translation will appear here..."
          value={outputText}
          readOnly
        />
      </div>
      <div className="mt-12 justify-center flex">
        <button
          disabled={!subtitles.length}
          className="px-4 py-2 bg-cyan-600 text-white text-xl rounded-md hover:bg-cyan-700 transition-colors duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleTranslate}
        >
          Translate
        </button>
        {showDownloadButton && (
        <button
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition delay-150 duration-200 ease-in-out"
          onClick={handleDownload}
        >
          Download SRT
        </button>
        )}
      </div>
      {/* <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit Original Captions
        </h2>
        {subtitles.map((sub, index) => (
          <div
            key={sub.id}
            className="mb-6 border p-4 rounded bg-gray-50 shadow-sm"
          >
            <p className="text-xs text-gray-600 mb-2">
              {sub.start} → {sub.end}
            </p>
            <textarea
              className="w-full border border-gray-300 rounded p-2 resize-y"
              value={sub.text}
              onChange={(e) => handleSubtitleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TextAreaPanel;
