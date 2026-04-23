"use client";

import { useChat } from "@ai-sdk/react";

export function useChatAI() {
    const chat = useChat();
    return chat;
}
