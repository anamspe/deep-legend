import { forwardRef } from "react";

const FileUpload = forwardRef(({ onFileLoaded }, ref) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = null; // Reset input value so the same file can be reselected if needed // triggers "onChange"

    // Handle file reading and loading to text area
    const reader = new FileReader();
    reader.onload = () => { 
      const buffer = reader.result;
      let text;

      try {
        // Try to decode the buffer as UTF-8 text
        const utf8Decoder = new TextDecoder("utf-8", {fatal: true});
        text = utf8Decoder.decode(buffer);
      } catch (err) {
        console.warn("UTF-8 decoding failed, falling back to Windows-1252.");
        // Fallback for files saved in Windows encodings
        const fallbackDecoder = new TextDecoder("windows-1252");
        text = fallbackDecoder.decode(buffer);
      }

      onFileLoaded(text, file.name);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="m-4 flex flex-col self-center">
      <input
        ref={ref}
        type="file"
        accept=".srt,.vtt,.txt, .csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 underline decoration-sky-600 file:mr-4 file:py-2 file:px-4 file:rounded-full File:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 file:cursor-pointer file:transition-colors file:duration-300 file:ease-in-out"
      />
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: .srt, .vtt, .txt, .csv
      </p>
    </div>
  );
});

export default FileUpload;
