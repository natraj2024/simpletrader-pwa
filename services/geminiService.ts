import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTradingAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are SimpleTrader AI, an educational assistant for blind and low-vision stock market beginners in India. 
      Answer this query concisely (under 100 words) so it is easy to hear via screen reader: ${query}`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    return "The AI assistant is currently unavailable.";
  }
};