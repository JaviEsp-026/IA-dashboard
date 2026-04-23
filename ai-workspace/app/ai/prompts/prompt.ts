export function mejorarPrompts(texto: string) {
    return `
        Actua como un editor profesional

        Mejora el siguiente texto:
        - hazlo más claro
        - corrige errores
        - mejora redacción

        texto: ${texto}
    `
}


export function resumirPrompts(texto: string) {
    return `
        Resume el siguiente texto de forma clara y breve:
        texto: ${texto}
    
    `
}