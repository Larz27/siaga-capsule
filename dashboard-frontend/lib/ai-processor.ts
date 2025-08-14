"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.OLLAMA_API_URL,
  apiKey: "not-needed", // Ollama doesn't require an API key
});

export async function processQuestion1WithAI(
  question1Text: string
): Promise<{ boldedText: string }> {
  try {
    const prompt = `
You are tasked with analyzing the following text and making key terms and important ideas bold using **bold** markdown syntax.

Instructions:
1. Identify KEY terms (important nouns, concepts, names, places, etc.)
2. Identify BOLD ideas (important statements, conclusions, main points)
3. Return a JSON object with a "boldedText" field containing the text with **bold** markdown applied to key terms and ideas
4. Do NOT change the original text content, only add **bold** formatting
5. Be selective - only bold truly important terms and ideas
6. Avoid bolding too many words
7. Bold text should be concise and to the point

Text to process:
${question1Text}

Return only a valid JSON object according to this typescript interface:
interface BoldedText {
  boldedText: string;
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-oss", // Default model, can be configured
      reasoning_effort: "low",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI model");
    }

    try {
      const parsed = JSON.parse(response);
      return parsed;
    } catch (parseError) {
      // Fallback: try to extract JSON from response
      const jsonMatch = response.match(/\{[^{}]*"boldedText"[^{}]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Invalid JSON response from AI model");
    }
  } catch (error) {
    console.error("AI processing error:", (error as Error).message);
    throw new Error(
      `AI processing failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function generateCollectiveExecutiveSummary(
  submissions: { question1: string; occupationStatus: string; otherOccupation?: string; sectorInterest: string; otherSector?: string }[]
): Promise<{ executiveSummary: string }> {
  try {
    const summaryData = submissions.map(sub => {
      const occupation = sub.occupationStatus === "Other" && sub.otherOccupation 
        ? sub.otherOccupation 
        : sub.occupationStatus;
      const sector = sub.sectorInterest === "Other" && sub.otherSector 
        ? sub.otherSector 
        : sub.sectorInterest;
      
      return {
        response: sub.question1,
        occupation,
        sector
      };
    });

    const prompt = `
You are an executive summary generator analyzing collective data from public submissions. Create an empowering, professional executive summary that captures the current mental state and wellbeing of the youth in Brunei.

Instructions:
1. Analyze patterns across all responses, occupations, and sectors
2. Identify common themes, aspirations, and challenges mentioned
3. Create an inspiring narrative about the collective potential and diversity
4. Highlight the range of sectors and occupations represented
5. Use professional, empowering language suitable for stakeholders or investors
6. Keep the summary comprehensive but concise (4-6 sentences)
7. Focus on collective strengths, shared values, and community potential
8. Pick out one quote from the submissions that is most representative of the collective mindset and add it to the summary in block quotes. Indicate the occupation and sector of the person who said the quote.
9. Format the response in MARKDOWN with **bold** text for key terms, important statistics, and impactful phrases. Avoid bolding too many words.
10. Use bullet points or other markdown formatting where appropriate to enhance readability
11. Return a JSON object with an "executiveSummary" field containing the markdown-formatted text

Data to analyze (${summaryData.length} submissions):
${JSON.stringify(summaryData, null, 2)}

Return only a valid JSON object according to this typescript interface:
interface ExecutiveSummary {
  executiveSummary: string;
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-oss",
      reasoning_effort: "low",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI model");
    }

    try {
      const parsed = JSON.parse(response);
      return parsed;
    } catch (parseError) {
      const jsonMatch = response.match(/\{[^{}]*"executiveSummary"[^{}]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Invalid JSON response from AI model");
    }
  } catch (error) {
    console.error("AI collective summary error:", (error as Error).message);
    throw new Error(
      `Collective executive summary generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
