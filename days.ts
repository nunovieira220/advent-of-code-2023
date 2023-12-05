import { Day } from 'lib';
import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import day5 from './day5';

const days: Record<number, Day> = {
  "1": day1,
  "2": day2,
  "3": day3,
  "4": day4,
  "5": day5
}

export default days;
