import { uniq } from 'lodash';

const checkIfGear = (lines: string[], lineIdx: number, digitIdx: number): boolean => {
  if (lineIdx < 0 || lineIdx >= lines.length) {
    return false
  }

  if (digitIdx < 0 || digitIdx >= lines[lineIdx].length) {
    return false
  }

  return lines[lineIdx][digitIdx] === "*"
}

const createGearId = (lineIdx: number, digitIdx: number): string => `${lineIdx}-${digitIdx}`;
const getGearsId = (lines: string[], lineIdx: number, digitIdx: number): string[] => {
  const gearIds: string[] = [];
  const addGearId = (lines: string[], lineIdx: number, digitIdx: number) => {
    if (checkIfGear(lines, lineIdx, digitIdx)) {
      gearIds.push(createGearId(lineIdx, digitIdx))
    }
  }

  addGearId(lines, lineIdx, digitIdx - 1);
  addGearId(lines, lineIdx, digitIdx + 1);
  addGearId(lines, lineIdx - 1, digitIdx);
  addGearId(lines, lineIdx + 1, digitIdx);
  addGearId(lines, lineIdx - 1, digitIdx - 1);
  addGearId(lines, lineIdx - 1, digitIdx + 1);
  addGearId(lines, lineIdx + 1, digitIdx - 1);
  addGearId(lines, lineIdx + 1, digitIdx + 1);

  return gearIds;
}

export default function second(input: string) {
  const lines = input.split("\n");
  const gearNumbers: Record<string, number[]> = {}

  const addGearsNumbers = (currentDigits: string[], gears: string[]) => {
    if (currentDigits.length > 0 && gears.length > 0) {
      gears.forEach(gear => {
        gearNumbers[gear] = (gearNumbers[gear] || [])
        gearNumbers[gear].push(parseInt(currentDigits.join("")))
      })
    }
  }

  for(let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let currentDigits: string[] = [];
    let gears: string[] = []

    for(let digitIdx = 0; digitIdx < line.length; digitIdx++) {
      const digit = parseInt(line[digitIdx]);

      if (isNaN(digit)) {
        addGearsNumbers(currentDigits, gears)
        currentDigits = [];
        gears = [];
        continue
      }

      currentDigits.push(line[digitIdx]);
      gears.push(...getGearsId(lines, lineIdx, digitIdx))
      gears = uniq(gears)
    }

    addGearsNumbers(currentDigits, gears)
  }

  let sum = 0;

  for (const gear in gearNumbers) {
    if (gearNumbers[gear].length == 2) {
      sum += gearNumbers[gear][0] * gearNumbers[gear][1];
    }
  }

  return sum;
}
