import "./App.css";
import TextAreaPanel from "./components/TextAreaPanel";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-100 texty-gray-900">
    <NavBar />
    <main className="flex-1 p-6 max-w-5xl mx-auto w-full"></main>
    <TextAreaPanel />
    </div>
    </>
  );
}

export default App;
