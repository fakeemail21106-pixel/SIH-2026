const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HF_API_KEY);

const queryAI = async (prompt, systemMessage = "You are a helpful travel assistant.") => {
  try {
    const response = await hf.chatCompletion({
      model: process.env.HF_MODEL || "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.3
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("HuggingFace Inference Error:", error.message);
    throw new Error("Failed to process AI request");
  }
};

module.exports = { queryAI };