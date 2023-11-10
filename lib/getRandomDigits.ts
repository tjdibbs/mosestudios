export default function generateRandom6DigitNumber() {
  // Generate a random number between 10000 and 99999
  const randomNumber = Math.floor(Math.random() * 999999);

  // Convert the random number to a string
  let randomNumberString = randomNumber.toString();

  // Pad the random number string with leading zeros if necessary
  if (randomNumberString.length < 6) {
    randomNumberString = randomNumberString.padEnd(6, "0");
  }

  return randomNumberString;
}
