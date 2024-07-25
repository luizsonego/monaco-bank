export const formatCurrency = (amount = 0, currency = "USD") => {
  const amounts = parseFloat(amount);

  const locale = currency === "USD" ? "pt-BR" : "pt-BR";
  const localeCurrency = currency === "USD" ? "USD" : "BRL";
  // Use a expressão regular para adicionar pontos de milhar e vírgulas ao número
  const formattedAmount = amounts.toLocaleString("pt-BR", {
    style: "currency",
    currency: localeCurrency,
  });

  return formattedAmount;
};
