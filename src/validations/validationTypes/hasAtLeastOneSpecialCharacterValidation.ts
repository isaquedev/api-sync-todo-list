export const hasAtLeastOneSpecialCharacter = (value: string) => {
  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return specialCharactersRegex.test(value);
}

