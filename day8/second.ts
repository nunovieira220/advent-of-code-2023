// Calculate Least Common Multiple (LCM) of an array
const gcd = (a: number, b: number): number => {
  while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
  }
  return a;
}

const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
const calculateLCM = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
  }
  return result;
}

type Pair<T> = { left: T; right: T; };

const getDirectionField = (dir: string) => dir === 'R' ? 'right' : 'left';

export default function second(input: string) {
  const lines = input.split("\n");
  const directions = lines[0].trim();
  const graph: Record<string, Pair<string>> = {};
  let starting = [];

  // Fill graph
  for (let i = 2; i < lines.length; i++) {
    const [key, dir] = lines[i].split(/\s+=\s+/);
    const [left, right] = dir.replaceAll(/[\(\)]/g, '').split(', ');

    graph[key] = { left, right };

    if (key.endsWith('A')) {
      starting.push(key);
    }
  }

  // Calculate number of jumps (assumed by checking results and looping jumps)
  const jumps: Record<number, number> = {};
  let sum = 0;
  let inZ = 0;

  while (inZ !== starting.length) {
    for (const dir of directions) {
      const field = getDirectionField(dir);

      starting = starting.map((point, idx) => {
        const newPoint: string = graph[point][field];

        if (newPoint.endsWith('Z') && !jumps[idx]) {
          jumps[idx] = sum + 1;
          inZ++;
        }

        return newPoint;
      });

      sum++;
    }
  }

  return calculateLCM(Object.values(jumps));
}
