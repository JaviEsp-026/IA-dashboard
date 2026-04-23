import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { systemPrompt } from "@/features/ai/systemPrompt";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  try {  
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...modelMessages
      ],
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });

  } catch (error) {
    console.error("ERROR EN /api/chat:", error)
    return new Response("Error en el servidor", { status: 500 })
  }

}
