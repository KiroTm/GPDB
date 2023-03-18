export function removeDuplicates(array: Array<any>) {
    return [...new Set(array)];
}  

//console.log(removeDuplicates([1, 2, 2, 3, 4, 5])) // [1, 2, 3, 4, 5]