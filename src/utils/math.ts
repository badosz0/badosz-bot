export function string_value(string: string, max = 100): number {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string[i].charCodeAt(0);
    }
    return Math.round(parseFloat(`0.${String(hash)}`) * max) + 1;
}
