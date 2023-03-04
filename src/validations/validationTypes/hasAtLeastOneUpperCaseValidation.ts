export const hasAtLeastOneUpperCase = (text: string) => {
  const textRegex = /^(?=.*[A-Z])/;
  return textRegex.test(text);
}
