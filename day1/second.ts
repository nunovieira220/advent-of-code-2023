
const replaceMap: Record<string, string> = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
};

const reverseStr = (str: string) => str.split("").reverse().join("")

const replaceLine = (line: string): string => {
  const forFirstDigit = line.replace(/one|two|three|four|five|six|seven|eight|nine|[^0-9]/g, m => replaceMap[m] || "");
  const forSecondDigit = reverseStr(line)
    .replace(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[^0-9]/g, m => replaceMap[reverseStr(m)] || "");

  return [forFirstDigit[0], forSecondDigit[0]].join("")
}

export default function second(input: string) {
  const lines = input.split('\n').map(line => replaceLine(line));
  let sum = 0;

  for (const line of lines) {
    let firstDigit = parseInt(line[0]);
    let secondDigit = parseInt(line[line.length - 1]);

    sum += firstDigit * 10 + secondDigit;
  }

  return sum
}
