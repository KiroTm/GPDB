export function isValidHex(hex: string) {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
        return true
    } else {
        return false
    }
}

//console.log(isValidHex("#FFFFFF")) // true
//console.log(isValidHex("#Hmmm idk random thing")) // false