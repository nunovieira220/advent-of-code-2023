
export default function second(input: string) {
  const lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    const [gameId, game] = line.split(':');
    const id = parseInt(gameId.substring(5))
    const rounds = game.split(';')
    const minValues: Record<string, number> = {
      "red": 0,
      "green": 0,
      "blue": 0
    };

    for (const round of rounds) {
      const cubes = round.split(',');

      for (const cube of cubes) {
        const [_, count, color] = cube.split(' ');
        const minValue = minValues[color];

        if (parseInt(count) > minValue) {
          minValues[color] = parseInt(count)
        }
      }
    }

    sum += (minValues["red"] || 1) * (minValues["green"] || 1) * (minValues["blue"] || 1)
  }

  return sum
}
