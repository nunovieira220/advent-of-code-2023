
export default function second(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    const lastNums = [];
    let nums = line.split(' ').map(num => parseInt(num)).reverse();

    while (true) {
      lastNums.push(nums[nums.length - 1]);

      const diffs: Map<number, number> = new Map();

      for (let i = 1; i < nums.length; i++) {
        const diff = nums[i] - nums[i - 1];

        diffs.set(diff, (diffs.get(diff) || 0) + 1);
        nums[i-1] = diff;
      }

      if (diffs.size === 1) {
        lastNums.push(nums[0]);

        break;
      }

      nums.pop();
    }

    sum += lastNums.reduce((acc, num) => acc + num, 0);
  }

  return sum;
}
