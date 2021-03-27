export function single(arr: unknown[]): unknown {
    return arr[Math.floor(Math.random() * arr.length)];
}
