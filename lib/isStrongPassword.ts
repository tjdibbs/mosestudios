export default function isStrongPassword(password: string) {
  // Minimum length of 8 characters
  const minLength = 8;

  // Regular expressions to check for uppercase, lowercase, digit, and symbol
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const symbolRegex = /[!@#$%^&*()_+\\.';:{}]/;

  // Check if the password meets all criteria
  return (
    password.length >= minLength &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    symbolRegex.test(password)
  );
}
