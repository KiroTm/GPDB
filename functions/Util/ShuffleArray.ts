export function shuffleArray(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
}
// console.log(shuffleArray([1, 2, 3, 4, 5])) // [3, 1, 4, 5, 2]
  
