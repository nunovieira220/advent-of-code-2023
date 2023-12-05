type Pair = {
  min: number;
  max: number;
}

const getSeedNumbers = (line: string): Pair[] => {
  const nums = line.split("seeds: ")[1].split(" ").map(num => parseInt(num));
  const pairs = [];

  for (let i = 0; i < nums.length; i += 2) {
    pairs.push({ min: nums[i], max: nums[i] + nums[i + 1] - 1 });
  }

  return pairs;
}

export default function second(input: string) {
  const lines = input.split("\n");
  let pairs = getSeedNumbers(lines[0]);
  let phase = 0;
  let lineIdx = 3;

  while(phase < 7) {
    const markedPairs: boolean[] = [];
    const newPairs: Pair[] = [];

    while(lines[lineIdx] && lines[lineIdx] != "\n") {
      const [dst, src, rng] = lines[lineIdx].split(" ").map(num => parseInt(num));
      let numPairs = pairs.length;

      for (let idx = 0; idx < numPairs; idx++) {
        if (markedPairs[idx]) {
          continue;
        }

        const pair = pairs[idx];
        const jump = src + rng;

        // when the pair is not in the range
        if (pair.min >= jump || pair.max < src) {
          continue;
        }

        // when the pair is totally in the range
        if (pair.min >= src && pair.max < jump) {
          markedPairs[idx] = true;
          pairs[idx] = { min: dst + pair.min - src, max: dst + pair.max - src };
          continue;
        }

        // when pair is partially in the range (left and right)
        if (pair.min < src && pair.max >= jump) {
          pairs[idx] = { min: pair.min, max: src - 1 };
          pairs.push({ min: jump, max: pair.max });

          numPairs++;

          newPairs.push({ min: dst, max: dst + jump - 1 - src })
          continue;
        }

        // when the pair is partially in the range (left)
        if (pair.min < src && pair.max < jump) {
          pairs[idx] = { min: pair.min, max: src - 1 };
          newPairs.push({ min: dst, max: dst + pair.max - src })
          continue;
        }

        // when the pair is partially in the range (right)
        if (pair.min >= src && pair.max >= jump) {
          pairs[idx] = { min: jump, max: pair.max };

          newPairs.push({ min: dst + pair.min - src , max: dst + jump - 1 - src });
          continue;
        }
      };

      lineIdx++;
    }

    pairs.push(...newPairs);
    phase++;
    lineIdx += 2;
  }

  return Math.min(...pairs.map(pair => pair.min))
}
