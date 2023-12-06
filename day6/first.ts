
export default function first(input: string) {
  const [t, d] = input.split("\n");
  const times = t.split("Time:")[1].trim().split(/\s+/).map(num => parseInt(num));
  const distances = d.split("Distance:")[1].trim().split(/\s+/).map(num => parseInt(num));

  if (times.length !== distances.length) {
    throw new Error('invalid input');
  }

  let result = 1;

  for (let i = 0; i < times.length; i++) {
    const goal = distances[i];
    const time = times[i];
    let counter = 0;

    for (let j = Math.round((goal/time) * 0.5); j < time; j++) {
      const value = j * (time - j);

      if (value > goal) {
        counter++;
        continue;
      }

      if (counter > 0) {
        break;
      }
    }

    result *= counter;
  }

  return result;
}
