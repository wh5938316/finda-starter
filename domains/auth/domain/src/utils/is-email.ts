export const isEmail = (input: string): boolean => {
  const emailRegex =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  const isEmail = emailRegex.test(input);
  return isEmail;
};
