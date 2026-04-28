export function extraerTareas(texto: string) {
    const lineas = texto.split(".");
    return lineas.map(linea => linea.trim()).filter(linea => linea.length > 0).map((t, i) => `Tarea ${i + 1}. ${t}`);
}