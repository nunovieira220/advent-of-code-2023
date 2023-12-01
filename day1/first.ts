
export default function first(input: string) {
  const lines = input.split('\n').map(line => line.replaceAll(/[^0-9]/g, ""));
  let sum = 0;

  for (const line of lines) {
    let firstDigit = parseInt(line[0]);
    let secondDigit = parseInt(line[line.length - 1]);

    sum += firstDigit * 10 + secondDigit;
  }

  return sum
}
