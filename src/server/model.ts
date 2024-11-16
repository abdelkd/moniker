import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "astro:env/server";

export const googleGenerativeAI = new GoogleGenerativeAI(GEMINI_API);
export const model = googleGenerativeAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
})
