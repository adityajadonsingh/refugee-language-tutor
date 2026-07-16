import { NextRequest, NextResponse } from "next/server";

import { ai } from "@/lib/gemini";
import { buildPrompt } from "@/lib/prompt";
import { GEMINI_MODEL } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { nativeLanguage, learningLanguage, message } = await request.json();

    const prompt = buildPrompt(
      nativeLanguage.name,
      learningLanguage.name,
      message,
    );

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: response.text,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      },
      {
        status: 500,
      },
    );
  }
}

