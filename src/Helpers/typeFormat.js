const types = {
  1: "Aporte",
  2: "Calculo Rentabilidade",
  3: "Saque",
  4: "Transferência",
};
const types_color = {
  1: "#555555",
  2: "#555555",
  3: "#990000",
  4: "#555555",
};

export const type_format = (type) => {
  return types[type] || "";
};
export const type_format_color = (type) => {
  return types_color[type] || "";
};
