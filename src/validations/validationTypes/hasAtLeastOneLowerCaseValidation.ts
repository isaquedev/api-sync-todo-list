export const hasAtLeastOneLowerCase = (text: string) => {
  const textRegex = /^(?=.*[a-z])/;
  return textRegex.test(text);
}
