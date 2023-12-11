type Point = { x: number; y: number };

export default function first(input: string) {
  const lines = input.split("\n");
  const rows = lines.length;
  const cols = lines[0].length;
  const usedX: Record<number, boolean> = {};
  const usedY: Record<number, boolean> = {};
  let points: Point[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (lines[i][j] === '#') {
        points.push({ x: i, y: j });
        usedX[i] = true;
        usedY[j] = true;
      }
    }
  }

  let diffX = 0;
  let diffY = 0;

  for (let i = 0; i < rows; i++) {
    if (!usedX[i]) {
      points = points.map(point => {
        if (point.x > i + diffX) { return { x: point.x + 1, y: point.y }; }
        return point;
      });
      diffX++;
    }
  }

  for (let i = 0; i < cols; i++) {
    if (!usedY[i]) {
      points = points.map(point => {
        if (point.y > i + diffY) { return { x: point.x, y: point.y + 1 }; }
        return point;
      });
      diffY++;
    }
  }

  let counter = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      counter += Math.abs(points[j].x - points[i].x) + Math.abs(points[j].y - points[i].y);
    }
  }

  return counter;
}
