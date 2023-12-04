
const checkIfSymbol = (lines: string[], lineIdx: number, digitIdx: number): boolean => {
  if (lineIdx < 0 || lineIdx >= lines.length) {
    return false
  }

  if (digitIdx < 0 || digitIdx >= lines[lineIdx].length) {
    return false
  }

  const symbol = lines[lineIdx][digitIdx]
  const digit = parseInt(symbol);

  if (isNaN(digit) && symbol !== ".") {
    return true
  }

  return false
}

export default function first(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  for(let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let currentDigits: string[] = [];
    let hasSymbol = false

    for(let digitIdx = 0; digitIdx < line.length; digitIdx++) {
      const digit = parseInt(line[digitIdx]);

      if (isNaN(digit)) {
        if (currentDigits.length > 0 && hasSymbol) {
          sum += parseInt(currentDigits.join(""))
        }

        currentDigits = [];
        hasSymbol = false;
        continue
      }

      currentDigits.push(line[digitIdx]);

      if (!hasSymbol) {
        hasSymbol = checkIfSymbol(lines, lineIdx, digitIdx - 1)
        || checkIfSymbol(lines, lineIdx, digitIdx + 1)
        || checkIfSymbol(lines, lineIdx - 1, digitIdx)
        || checkIfSymbol(lines, lineIdx + 1, digitIdx)
        || checkIfSymbol(lines, lineIdx - 1, digitIdx - 1)
        || checkIfSymbol(lines, lineIdx - 1, digitIdx + 1)
        || checkIfSymbol(lines, lineIdx + 1, digitIdx - 1)
        || checkIfSymbol(lines, lineIdx + 1, digitIdx + 1);
      }
    }

    if (currentDigits.length > 0 && hasSymbol) {
      sum += parseInt(currentDigits.join(""))
    }
  }

  return sum
}
