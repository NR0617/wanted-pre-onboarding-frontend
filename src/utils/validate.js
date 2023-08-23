export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
};
export const validatePassword = (password) => {
  return password.length >= 8;
};
