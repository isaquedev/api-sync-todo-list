export const hasAtLeastOneNumber = (text: string) => {
  const textRegex = /^(?=.*[0-9])/;
  return textRegex.test(text);
}
