export const date_format = (date) => {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString("pt-br");
};
