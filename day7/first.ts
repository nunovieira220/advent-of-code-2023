type HandCounter = Record<string, number>;
type Hand = { hand: string; bid: number; }
enum CardType {
  FIVE_OF_A_KIND = 6,
  FOUR_OF_A_KIND = 5,
  FULL_HOUSE = 4,
  THREE_OF_A_KIND = 3,
  TWO_PAIR = 2,
  ONE_PAIR = 1,
  HIGH_CARD = 0
}

// Hand checkers
const isFive = (nums: number[]) => nums.includes(5) ? CardType.FIVE_OF_A_KIND : -1;
const isFour = (nums: number[]) => nums.includes(4) ? CardType.FOUR_OF_A_KIND : -1;
const isFull = (nums: number[]) => nums.includes(3) && nums.includes(2) ? CardType.FULL_HOUSE : -1;
const isThree = (nums: number[]) => nums.includes(3) ? CardType.THREE_OF_A_KIND : -1;
const isTwo = (nums: number[]) => nums.filter(value => value === 2).length === 2 ? CardType.TWO_PAIR : -1;
const isOne = (nums: number[]) => nums.includes(2) ? CardType.ONE_PAIR : -1;
const checkers = [isFive, isFour, isFull, isThree, isTwo, isOne];

// Find hand type from hand counters
const findHandType = (hand: HandCounter): number => {
  for (const func of checkers) {
    const result = func(Object.values(hand));
    if (result >= 0) {
      return result;
    }
  }

  return CardType.HIGH_CARD;
}

// Get number associated with card
const cardToNumber = (card: string): number => {
  switch (card) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(card);
  }
}

// Compare two hands in order to sort them when on same type
const handComparator = (a: Hand, b: Hand): number => {
  for (let i = 0; i < 5; i++) {
    const first = cardToNumber(a.hand[i]);
    const second = cardToNumber(b.hand[i]);

    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    }
  }

  return 0;
}

export default function first(input: string) {
  const lines = input.split("\n");
  const combs: Hand[][] = [[], [], [], [], [], [], []];

  for (const line of lines) {
    const [h, b] = line.split(" ");
    const hand = { hand: h, bid: parseInt(b) };
    const cardCounter = h.split("").reduce((acc, card) => { acc[card] = (acc[card] || 0) + 1; return acc; }, {} as HandCounter);

    combs[findHandType(cardCounter)].push(hand);
  }

  let rank = 1;
  let sum = 0;

  for (const comb of combs) {
    comb.sort(handComparator).forEach(hand => {
      sum += hand.bid * rank;
      rank++;
    });
  }

  return sum;
}
