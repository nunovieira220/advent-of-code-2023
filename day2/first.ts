
const colorMaxMap: Record<string, number> = {
  "red": 12,
  "green": 13,
  "blue": 14
};

export default function first(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    const [gameId, game] = line.split(':');
    const id = parseInt(gameId.substring(5))
    const rounds = game.split(';')
    let valid = true;

    for (const round of rounds) {
      const cubes = round.split(',');

      for (const cube of cubes) {
        const [_, count, color] = cube.split(' ');
        const maxCount = colorMaxMap[color] || 0

        if (parseInt(count) > maxCount) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        break;
      }
    }

    if (valid) {
      sum += id
    }
  }

  return sum
}
