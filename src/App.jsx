import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw"}}>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>Deep Legend</h1>
        <div style={styles.textareasWrapper}>
          <textarea placeholder="Enter text here..." style={styles.textarea} />
          <textarea
            placeholder="Translation will appear here..."
            style={{ ...styles.textarea, backgroundColor: "#f0f0f0" }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1, // take all available vertical space
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
  },
  textareasWrapper: {
    display: "flex",
    gap: 20,
    flex: 1, // fill vertical space
  },
  textarea: {
    flex: 1,
    height: "100%", // full height of the wrapper
    padding: 15,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    resize: "none",
    fontFamily: "inherit",
  },
};


export default App;
