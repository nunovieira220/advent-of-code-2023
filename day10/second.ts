interface Point {
  x: number;
  y: number;
}

interface PointWithSteps extends Point {
  steps: number;
}

enum Direction {
  N = 0,
  S = 1,
  E = 2,
  W = 3
}

const checkIfPipeMatch = (current: string, next: string, direction: Direction): boolean => {
  switch(direction) {
    case Direction.N:
      if (current === '|' || current === 'L' || current === 'J') {
        return next === '|' || next === 'F' || next === '7';
      }
      return false;
    case Direction.S:
      if (current === '|' || current === 'F' || current === '7') {
        return next === '|' || next === 'L' || next === 'J';
      }
      return false;
    case Direction.W:
        if (current === '-' || current === 'F' || current === 'L') {
          return next === '-' || next === 'J' || next === '7';
        }
        return false;
    case Direction.E:
      if (current === '-' || current === 'J' || current === '7') {
        return next === '-' || next === 'F' || next === 'L';
      }
      return false;
    default:
      return false;
  }
}

const identityS = (matrix: string[][], point: Point, visited: boolean[][]): string => {
  for (const pipe of ['|', '-', 'F', 'L', 'J', '7']) {
    matrix[point.x][point.y] = pipe;
    let counter = 0;

    isValidCell(matrix, point, point.x - 1, point.y, Direction.N, visited) && counter++;
    isValidCell(matrix, point, point.x + 1, point.y, Direction.S, visited) && counter++;
    isValidCell(matrix, point, point.x, point.y + 1, Direction.W, visited) && counter++;
    isValidCell(matrix, point, point.x, point.y - 1, Direction.E, visited) && counter++;

    if (counter >= 2) {
      return pipe;
    }
  }

  return 'S';
}

function isValidCell(matrix: string[][], current: Point, x: number, y: number, dir: Direction, visited: boolean[][]): boolean {
  const rows = matrix.length;
  const cols = matrix[0].length;
  return x >= 0 && x < rows && y >= 0 && y < cols && checkIfPipeMatch(matrix[current.x][current.y], matrix[x][y], dir) && !visited[x][y];
}

export default function second(input: string) {
  const lines = input.split("\n");
  let starting: Point = null as unknown as Point;
  const matrix: string[][] = lines.map((line, idx) => {
    const pos = line.split('').indexOf('S');
    if (pos >= 0) {
      starting = { x: idx, y: pos };
    }
    return line.split('');
  });

  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  matrix[starting.x][starting.y] = identityS(matrix, starting, visited);

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const queue: PointWithSteps[] = [{ ...starting, steps: 0 }];
  visited[starting.x][starting.y] = true;

  let farthestPoint: PointWithSteps | null = null;

  while (queue.length > 0) {
      const current = queue.shift()!;
      farthestPoint = { ...current };

      for (let i = 0; i < 4; i++) {
          const newX = current.x + dx[i];
          const newY = current.y + dy[i];

          if (isValidCell(matrix, current, newX, newY, i, visited)) {
              visited[newX][newY] = true;
              queue.push({ x: newX, y: newY, steps: current.steps + 1 });
          }
      }
  }

  let counter = 0;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (!visited[x][y]) {
        const line = matrix[x].map((ch, idx) => visited[x][idx] ? ch : '#').slice(y).join('');
        const wall = (line.match(/\||L|J/g) || []).length;

        if (wall % 2 !== 0) {
          counter++;
        }
      }
    }
  }

  return counter;
}
