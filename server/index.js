import express from "express";
import cors from "cors";
import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);


// routes
app.get("/", (req,res) => {
  res.send("Deep Legend backend is up and running!");
});

app.post("/translate", async (req, res) => {
  const {lines, targetLang} = req.body;

  if (!Array.isArray(lines)) {
    return res.status(400).json({error: "Lines must be an array."});
  }

  try {
    const result = await translator.translateText(
      lines,
      null, // detect language
      targetLang || "pt-BR" // falls to PT-BR in case no targetLang is sent
    );

    // If only one line was sent, result is a single object, otherwise array
    const translations = Array.isArray(result)
      ? result.map((r) => r.text)
      : [result.text];

    res.json({ translated: translations });
  } catch (error) {
    console.error("DeepL SDK error:", error.message || error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening at localhost:${PORT}`);
});
