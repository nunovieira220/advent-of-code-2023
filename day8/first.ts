type Pair<T> = { left: T; right: T; };

const getDirectionField = (dir: string) => dir === 'R' ? 'right' : 'left';

export default function first(input: string) {
  const lines = input.split("\n");
  const directions = lines[0].trim();
  const graph: Record<string, Pair<string>> = {};

  // Fill graph
  for (let i = 2; i < lines.length; i++) {
    const [key, dir] = lines[i].split(/\s+=\s+/);
    const [left, right] = dir.replaceAll(/[\(\)]/g, '').split(', ');

    graph[key] = { left, right };
  }

  console.log(graph);

  // Calculate number of movements
  let sum = 0;
  let position = "AAA";

  while (position !== "ZZZ") {
    for (const dir of directions) {
      const field = getDirectionField(dir);

      position = graph[position][field];
      sum++;

      if (position === "ZZZ") {
        break;
      }
    }
  }

  return sum;
}
