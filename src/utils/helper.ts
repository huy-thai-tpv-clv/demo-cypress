export function validatePassword(password: string) {
  // Updated password validation rules
  const minLength = 8;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return { error: `Password must be at least ${minLength} characters long` };
  }

  if (!lowercaseRegex.test(password)) {
    return { error: "Password must contain at least one lowercase letter" };
  }

  if (!uppercaseRegex.test(password)) {
    return { error: "Password must contain at least one uppercase letter" };
  }

  if (!numberRegex.test(password)) {
    return { error: "Password must contain at least one number" };
  }

  if (!specialSymbolRegex.test(password)) {
    return { error: "Password must contain at least one special symbol" };
  }

  return { error: null };
}
