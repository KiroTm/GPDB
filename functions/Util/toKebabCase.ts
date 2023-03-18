export function toKebabCase(str: string) {
    return str.toLowerCase().replace(/\s+/g, '-');
}

// console.log(toKebabCase("Hello World")) // hello-world