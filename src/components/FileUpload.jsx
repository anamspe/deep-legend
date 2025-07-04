import { forwardRef } from "react";

const FileUpload = forwardRef(({ onFileLoaded }, ref) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileLoaded(file);
    }

    // Handle file reading and loading to text area
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      onFileLoaded(text);
    };
    reader.readAsText(file);
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
