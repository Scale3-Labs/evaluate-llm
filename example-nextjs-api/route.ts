import * as Langtrace from "@langtrase/typescript-sdk";
import { NextRequest, NextResponse } from "next/server";
// prettier-ignore
Langtrace.init({ api_key: '<LANGTRACE_API_KEY>', 
instrumentations: {
  openai: OpenAI,
},
 });
// prettier-ignore
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { userId, userScore, traceId, spanId } = await req.json();

    await Langtrace.sendUserFeedback({
      userId: userId,
      userScore: userScore,
      traceId: traceId,
      spanId: spanId,
    });

    return NextResponse.json(
      { message: "feedback sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong while sending feedback",
      },
      { status: 404 }
    );
  }
}
