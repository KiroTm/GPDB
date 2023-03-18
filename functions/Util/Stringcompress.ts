export function compress_String(text: string, max_length: number) {
    if (max_length >= text.length) return "null"
    return text.substring(0, max_length).trim() + "..";
}

//console.log(compress_String("1234567890", 4)) // 1234..     