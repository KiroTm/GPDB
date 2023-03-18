function toCompactNum(num: number | string): string {
    if (typeof num === "number") {
        return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
    } else if (typeof num === "string") {
        const abbrev = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "V", "Uv", "Dv", "Tv", "Qav", "Qiv", "Sxv", "Spv", "Ocv", "Nov", "C", "Uc", "Dc"];
        const numValue = parseInt(num, 10);
        if (isNaN(numValue) || numValue < 0) {
            return "0";
        }
        if (numValue < 1000) {
            return numValue.toString();
        }
        const exponent = Math.min(
            Math.floor(Math.log10(numValue) / 3),
            abbrev.length - 1
        );
        const roundedNum = (numValue / Math.pow(10, exponent * 3)).toFixed(1);
        return `${roundedNum.replace(/\.0$/, "")}${abbrev[exponent]}`;
    }
    return "0";
}

// Accepts both string and number values!
