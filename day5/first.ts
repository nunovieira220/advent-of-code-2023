const getSeedNumbers = (line: string): number[] => {
  const [_, nums] = line.split("seeds: ");
  return nums.split(" ").map(num => parseInt(num));
}

export default function first(input: string) {
  const lines = input.split("\n");
  let nums = getSeedNumbers(lines[0]);
  let phase = 0;
  let lineIdx = 3;

  while(phase < 7) {
    const changedNums: boolean[] = [];

    while(lines[lineIdx] && lines[lineIdx] != "\n") {
      const [dst, src, rng] = lines[lineIdx].split(" ").map(num => parseInt(num));

      nums = nums.map((num, idx) => {
        if (changedNums[idx]) {
          return num;
        }

        const diff = num - src;

        if (diff >= 0 && diff < rng) {
          changedNums[idx] = true;
          return dst + diff;
        }

        return num;
      });

      lineIdx++;
    }

    phase++;
    lineIdx += 2;
  }

  return Math.min(...nums)
}
