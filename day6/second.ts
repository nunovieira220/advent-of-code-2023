
export default function second(input: string) {
  const [t, d] = input.split("\n");
  const time = parseInt(t.split("Time:")[1].replaceAll(" ", ""))
  const distance = parseInt(d.split("Distance:")[1].replaceAll(" ", ""))

  let counter = 0;

  for (let j = Math.round((distance/time) * 0.5); j < time; j++) {
    const value = j * (time - j);

    if (value > distance) {
      counter++;
      continue;
    }

    if (counter > 0) {
      break;
    }
  }

  return counter;
}
