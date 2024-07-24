import { FOOD_DATA_PROMPT } from "@/lib/constants";
import * as Langtrace from "@langtrase/typescript-sdk";
import { NextRequest, NextResponse } from "next/server";
import * as openai from "openai";
import { OpenAI } from "openai";

Langtrace.init({
  api_key: "<LANGTRACE_API_KEY>",
  instrumentations: {
    openai,
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  let response = null;
  let spanId = null;
  let traceId = null;

  if (file && file instanceof File) {
    const client = new OpenAI({
      apiKey: "<OPENAI_API_KEY>",
    });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    const result = await Langtrace.withLangTraceRootSpan(
      async (spanId: any, traceId: any) => {
        response = await client.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: FOOD_DATA_PROMPT },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64}`,
                  },
                },
              ],
            },
          ],
        });
        return { response, spanId, traceId };
      }
    );

    response = result.response;
    spanId = result.spanId;
    traceId = result.traceId;
  }

  const data = response!.choices[0].message.content!;
  return NextResponse.json({ response: data, spanId, traceId });
}
