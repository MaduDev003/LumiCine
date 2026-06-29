export function randomNumber(n1: number) {
  const x = Math.sin(n1) * 100;
  return x - Math.floor(x);
}