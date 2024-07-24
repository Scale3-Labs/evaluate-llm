import * as Langtrace from "@langtrase/typescript-sdk";
import { NextRequest, NextResponse } from "next/server";

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
    console.log("error", error);
    return NextResponse.json(
      {
        error: "Something went wrong while sending feedback",
      },
      { status: 404 }
    );
  }
}
