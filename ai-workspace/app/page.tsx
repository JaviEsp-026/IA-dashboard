
"use client";

import Message from "@/components/message";
import { useState } from "react";
import { useChatAI } from "@/features/useChat";
import { mejorarPrompts, resumirPrompts } from "./ai/prompts/prompt";
import ActionButton from "@/components/actionButton";

export default function Home() {
  const nombre = "Yota";
  const { messages, status, sendMessage, error } = useChatAI();
  const [input, setInput] = useState("");

  const obtenerTextoMensaje = (parts?: Array<{ type?: string; text?: string }>) =>
    parts
      ?.filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("") ?? "";

  //funcion para enviar
  const enviar = async () => {
    if (!input.trim()) return
    await sendMessage({
      text: input
    })
    setInput("")
  }

  //TODO: modificart la funcion del boton para adaptarlo a la app real
  const mejorarPromptsText = async () => {
    if (!input.trim()) return
   
    await sendMessage({
      text: mejorarPrompts(input)
    })

    setInput("")
  }

  //TODO: modificart la funcion del boton para adaptarlo a la app real
  const resumirPromptsText = async () => {
    if (!input.trim()) return
   
    await sendMessage({
      text: resumirPrompts(input)
    })

    setInput("")
  }


  return (
    <div style={
      {
        padding: "20px"
      }
    }>
      <h1>ChatBot IA {nombre}</h1>


      <div>
        <ul>
          {messages.map((mensaje, index) => (
            <li style={{
              marginBottom: "10px",
              display: "block"
            }} key={index}>
              <Message key={index}
                content={obtenerTextoMensaje(mensaje.parts)}
                role={mensaje.role as "user" | "assistant"} />
            </li>
          ))}
        </ul>

        {(status === "submitted" || status === "streaming") && <p>Escribiendo...</p>}
        {status === "error" && <p>Error: {error?.message ?? "Ha fallado la petición"}</p>}

        <div style={{
          display: "flex",
          gap: "10px",
          background: "#fefefe",
          padding: "10px",
          borderRadius: "5px",
          color: "black"
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe algo..."
          />

          <ActionButton onClick={enviar} text="enviar" buttonClass="standar-button"/>
          <ActionButton onClick={mejorarPromptsText} text="mejorar" buttonClass="upgrade-button"/>
          <ActionButton onClick={resumirPromptsText} text="resumir" buttonClass="resume-button"/>

          
        </div>
      </div>
    </div>
  );
}
