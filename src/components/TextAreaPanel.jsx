import { useState } from "react";
import FileUpload from "./FileUpload";

function TextAreaPanel() {
  const [inputText, setIputText] = useState("");
  const [outputText, setOutputText] = useState("");

  return (
    <div>
      <div className="grid grid-cols-4 mb-4">
        <div className="col-span-3">
        <FileUpload onFileLoaded={setIputText} />
        </div>
        <button
          className="justify-self-end self-center w-30 h-10 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 ml-4"
          onClick={() => {
            setIputText("");
            setOutputText("");
          }}
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
          onChange={(e) => setIputText(e.target.value)}
        />
        <i className="fa-solid fa-right-left self-center text-2xl text-cyan-600"></i>
        <textarea
          className="flex-1 p-4 border border-gray-200 rounded-md resize-none h-64 "
          placeholder="Translation will appear here..."
          value={outputText}
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
    </div>
  );
}

export default TextAreaPanel;
