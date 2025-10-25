import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("✅ Shiksharthi Gemini AI Backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 Received message:", message);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);

    const reply = result.response.text();
    console.log("🤖 Gemini Reply:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("❌ Error connecting to Gemini:", error);
    res.status(500).json({ error: "Error connecting to Gemini AI" });
  }
});

app.listen(5000, () => console.log("🚀 Gemini AI Server running on port 5000"));
