import { useState } from "react";
import FileUpload from "./FileUpload";

function TextAreaPanel() {
  
  const [inputText, setIputText] = useState("");
  const [outputText, setOutputText] = useState("");

  return (

    <div>
      <FileUpload onFileLoaded={setIputText} />

    <div className="flex flex-col md:flex-row gap-4">
      <textarea
        className="flex-1 p-4  bg-gray-50 border border-gray-300 rounded-md resize-none h-64"
        placeholder="Paste subtitle text here..."
        value={inputText}
        onChange={(e) => setIputText(e.target.value)}
      />
      <i className="fa-solid fa-right-left self-center text-2xl text-cyan-600"></i>
      <textarea
        className="flex-1 p-4 border border-gray-200 rounded-md resize-none h-64"
        placeholder="Translation will appear here..."
        value={outputText}
        readOnly
      />
    </div>
    </div>
  );
}

export default TextAreaPanel;
