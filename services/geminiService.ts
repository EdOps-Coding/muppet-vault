import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// In production, route through the proxy (API key stays server-side)
// In local dev, call Gemini directly with your local API key
const isProxied = !!process.env.GEMINI_PROXY_URL;

const ai = isProxied
  ? new GoogleGenAI({
      apiKey: "PROXIED",
      httpOptions: { baseUrl: process.env.GEMINI_PROXY_URL },
    })
  : new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askMuppetLore = async (history: ChatMessage[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are a world-class Muppet Historian and Lore Expert. 
        You know everything about Jim Henson, The Muppet Show (1970s), Muppets Now (2020s), 
        the movies, and the performers. 
        Keep your tone playful, enthusiastic, and slightly whimsical (like a Muppet production). 
        Mention specific episodes, guest stars, or character quirks when answering. 
        If someone asks about something not related to Muppets, politely steer them back to the Muppet world.`,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text || "Sorry, I lost my notes in the prop room! (Error)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Swedish Chef accidentally spilled bork-bork on the servers. Try again! (API Error)";
  }
};
