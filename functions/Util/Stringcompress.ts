export function compress_String(text: string, max_length: number) {
    if (max_length <= text.length) return false
    return text.substring(0, max_length).trim() + "..";
}