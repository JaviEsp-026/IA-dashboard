"use client";

import { useChat } from "@ai-sdk/react";
import { use, useEffect } from "react";

export function useChatAI() {
    const chat = useChat();


    useEffect(() => {
        const storedMessages = localStorage.getItem("chatMessages");    
        if (storedMessages) {
            try {
                const parsedMessages = JSON.parse(storedMessages);      
                if (Array.isArray(parsedMessages)) {
                    chat.setMessages(parsedMessages);
                } else {
                    console.warn("Los mensajes almacenados no son un array:", parsedMessages);
                } 
            } catch (error) {
                console.error("Error al parsear los mensajes almacenados:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (chat.messages.length > 0) {
            console.log("Mensajes del chat:", chat.messages);
            localStorage.setItem("chatMessages", JSON.stringify(chat.messages));
        }
    }, [chat.messages])

    return chat;


}
