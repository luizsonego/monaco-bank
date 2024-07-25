const types = {
  1: "Aporte",
  2: "Calculo Rentabilidade",
  3: "Saque",
  4: "Transferência",
};

export const type_format = (type) => {
  return types[type] || "";
};
