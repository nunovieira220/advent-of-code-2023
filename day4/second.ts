import { intersection, reduce } from 'lodash';

export default function second(input: string) {
  const lines = input.split("\n");
  const cardCounter: Record<number, number> = {};

  for (const line of lines) {
    const [cardId, values] = line.split(/:\s+/);
    const [winners, played] = values.split(/\s+\|\s+/);
    const winNumbers = winners.split(/\s+/);
    const playedNumbers = played.split(/\s+/);
    const rightNumbers = intersection(winNumbers, playedNumbers);
    const cardNumber = parseInt(cardId.substring(5));

    cardCounter[cardNumber] = (cardCounter[cardNumber] || 0) + 1;

    for (let i = 1; i <= rightNumbers.length; i++) {
      cardCounter[cardNumber + i] = (cardCounter[cardNumber + i] || 0) + cardCounter[cardNumber];
    }
  }

  return reduce(cardCounter, (a, b) => a + b, 0);
}
