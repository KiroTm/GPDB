import { Util } from "canvacord"
export async function isValidHex(hex: string) {
    if (Util.validateHex(hex) === true) {
        return true
    } else {
        return false
    }
}

// Required package: "canvacord"
//Download it via- "https://www.npmjs.com/package/canvacord"