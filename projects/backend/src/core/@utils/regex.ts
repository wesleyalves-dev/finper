// Validates a string with 8 to 50 characters, requiring at least one lowercase, uppercase, digit, and special character.
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/
