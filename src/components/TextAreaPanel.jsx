import { useRef, useState } from "react";
import FileUpload from "./FileUpload";
import { parseSRT } from "../utils/parseSRT";

const TextAreaPanel = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const fileInputRef = useRef();

  const handleClear = () => {
    setInputText(""); // Clear the input text area
    setOutputText(""); // Clear the output text area
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clear the file input
    }
  };

  const handleFileLoad = (text) => {
    setInputText(text);

    const parsedSubtitles = parseSRT(text);
    setSubtitles(parsedSubtitles);
    console.log("Subtitles in state:", parsedSubtitles);
  };

  const handleSubtitleChange = (index, newText) => {
    const updated = [...subtitles];
    updated[index].text = newText
    setSubtitles(updated);
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

      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          className="flex-1 p-4  bg-gray-50 border border-gray-300 rounded-md resize-none h-64"
          placeholder="Paste subtitle text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <i className="fa-solid fa-right-left self-center text-2xl text-cyan-600"></i>
        <textarea
          className="flex-1 p-4 border border-gray-200 rounded-md resize-none h-64 "
          placeholder="Translation will appear here..."
          value={outputText}
          readOnly
        />
      </div>
      <div className="mt-12 justify-center flex">
        <button
          className="px-4 py-2 bg-cyan-600 text-white text-xl rounded-md hover:bg-cyan-700 transition-colors duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            // Placeholder for translation logic
            setOutputText(inputText); // For now, just echo input to output
          }}
        >
          Translate
        </button>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Editable Captions
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
      </div>
    </div>
  );
};

export default TextAreaPanel;
