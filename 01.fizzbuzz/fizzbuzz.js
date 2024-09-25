#!/usr/bin/env node

export const fizzbuzz = (number) => {
  if (number % 15 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else {
    return String(number);
  }
};

if (process.argv[1] === import.meta.filename) {
  for (let i = 1; i < 21; i++) {
    console.log(fizzbuzz(i));
  }
}
