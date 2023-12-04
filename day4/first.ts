import { intersection } from 'lodash';

export default function first(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    const [_, values] = line.split(/:\s+/);
    const [winners, played] = values.split(/\s+\|\s+/);
    const winNumbers = winners.split(/\s+/);
    const playedNumbers = played.split(/\s+/);
    const rightNumbers = intersection(winNumbers, playedNumbers);

    if (rightNumbers.length > 0) {
      sum += Math.pow(2, rightNumbers.length - 1);
    }
  }

  return sum
}
