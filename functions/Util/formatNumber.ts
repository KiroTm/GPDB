export function formatCurrency(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, ',');
}

//console.log(formatCurrency(12345)) // 12,345