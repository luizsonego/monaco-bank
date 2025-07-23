const types = {
  1: "Aporte",
  2: "Calculo Rentabilidade",
  3: "Saque",
  4: "Transferência",
};
const types_color = {
  1: "#43936C",
  2: "#43936C",
  3: "#606060",
  4: "#43936C",
};
const types_color_ARROW = {
  1: "#43936C",
  2: "#43936C",
  3: "#d90d0d",
  4: "#43936C",
};

export const type_format = (type) => {
  return types[type] || "";
};
export const type_format_color = (type) => {
  return types_color[type] || "";
};
export const type_format_color_ARROW = (type) => {
  return types_color_ARROW[type] || "";
};
