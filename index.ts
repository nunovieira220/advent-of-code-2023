import { argv, exit } from 'process';
import days from './days';
import * as fs from 'fs';

if (!argv[2] || isNaN(parseInt(argv[2]))) {
  console.log("error: invalid day number");
  exit(1);
}

if (!["first", "second"].includes(argv[3])) {
  console.log("error: invalid day test");
  exit(1);
}

const dayNumber = parseInt(argv[2]);
const dayTest = argv[3] as "first" | "second";
const day = days[dayNumber];
const filename = argv[4] || "input.txt";
const input = fs.readFileSync(`./day${dayNumber}/${filename}`, 'utf-8');

console.log(day[dayTest](input));
