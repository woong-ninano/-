
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getProjectSummary(context: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `다음 프로젝트 완료 보고 내용을 바탕으로 3줄 요약을 작성해줘: ${context}`,
      config: {
        systemInstruction: "당신은 전문적인 비즈니스 분석가입니다. 한국어로 정중하고 명확하게 답변하세요.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "요약을 불러오는 데 실패했습니다.";
  }
}
