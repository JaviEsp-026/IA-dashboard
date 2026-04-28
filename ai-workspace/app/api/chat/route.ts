import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, stepCountIs, UIMessage } from "ai";
import { systemPrompt } from "@/features/ai/systemPrompt";
import { extraerTareas } from "@/features/ai/tools";
import { z } from "zod";

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
      tools: {
        extraerTareas: {
          description: "Extrae las tareas de un texto dado, devuelve una lista de tareas numerada.",
          inputSchema: z.object({
            texto: z.string().describe("El texto del cual extraer las tareas.")
          }),
          execute : async ({ texto }) => {
            console.log("extraerTareas texto:", texto);
            return extraerTareas(texto);
          }
        }
      },
      stopWhen: stepCountIs(3)
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });

  } catch (error) {
    console.error("ERROR EN /api/chat:", error)
    return new Response("Error en el servidor", { status: 500 })
  }

}
