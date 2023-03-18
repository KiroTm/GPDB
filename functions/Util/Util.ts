import fs from 'fs'
import path from 'path'
export class Utils {
    /**
     * @param num - Converts Numbers like 10000 to "10,000" format.
     * @returns {string}
     */
    static formatNumber(num: number): string {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * @param {string} path_1 - ```javascript
     *      import path from 'path';    
     *      const path = path.join(__dirname, "<your path here>", "<folder name here>");
     *      const folders = getAllFiles(path, true) // returns an array of all the sub folders of the given parent folder as given in the "path" declaration.
     * ```
     * @param {boolean} folderOnly - Whether to return folders or files
     */
    static getAllFiles(path_1: string, folderOnly?: boolean | false) {
        const getAllFiles = (path1 = path_1, foldersOnly = folderOnly) => {
            const files = fs.readdirSync(path1, {
                withFileTypes: true,
            });
            let filesFound: any[] = [];
            for (const file of files) {
                const filePath = path.join(path1, file.name);
                if (file.isDirectory()) {
                    if (foldersOnly) {
                        filesFound.push(filePath);
                    }
                    else {
                        filesFound = [...filesFound, ...getAllFiles(filePath)];
                    }
                    continue;
                }
                filesFound.push(filePath);
            }
            return filesFound;
        };
    };

    /**     
     * @returns {boolean}
     */
    static isValidHex(hex: string): boolean {
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
            return true
        } else {
            return false
        }
    };

    /**
     * @param {Array<any>} arr - Input an array.    
     */
    static removeDuplicates(arr: Array<any>) {
        return [...new Set(arr)]
    };

    /**
     * @param {Array<any>} array - Input an array
     * @returns - A shuffled array
     */
    static ShuffleArray(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    /**
     * @param {string} text - Input a string
     * @param {number} max_length - Max charaters your text should have
     * @returns {string} ```javascript 
     * const string = "12345"
     * Compress_String(string, 2) // returns "12.."
     * ```
     */
    static Compress_String(text: string, max_length: number): string {
        if (max_length >= text.length) return "null"
        return text.substring(0, max_length).trim() + "..";
    }

    /**
     * @param {number | string} num - Input a number
     * @returns {string} ```javascript
     * toCompactNumber(num: "1900")// returns "1.9k"
     * ```
     */
    static toCompactNumber(num: number | string): string {
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

    /**
     * @param {string} str - Input a string.
     * @returns {string} - Removes all spaces from the string and replaces it with "-" a.k.a a kebab case
     */
    static toKebabCase(str: string): string {
        return str.toLowerCase().replace(/\s+/g, '-');
    }

    /**
     * @param {string} str - Input a string
     * @returns ```javascript
     * toTitleCase("this is a general utility class") // returns This Is A General Utility Class.
     * ```
     */
    static toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
    }
}