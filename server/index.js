require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());


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
    const responses = await Promise.all(
      lines.map((text) => 
        axios.post(
          "https://api-free.deepl.com/v2/translate",
          new URLSearchParams({
            auth_key: process.env.DEEPL_API_KEY,
            text,
            target_lang: targetLang || "PT", // Fallback/Default to Portuguese
          })
        )
      )
    );

  const translated = responses.map((r) => r.data.translations[0].text);
  res.json({translated});
  } catch (err) {
    console.error("Translation error:", err.response?.data || err.message);
    res.status(500).json({ err: "Translation failed" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening at localhost:${PORT}`);
});
