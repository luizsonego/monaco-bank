export const date_format = (date) => {
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString("pt-br");
};

export const formatDateShort = (date) => {
  const dateFormat = new Date(date);
  const day = dateFormat.getDate();
  const month = dateFormat.toLocaleDateString("pt-br", { month: "short" });
  const year = dateFormat.getFullYear();
  
  return `${day} ${month} ${year}`;
};

