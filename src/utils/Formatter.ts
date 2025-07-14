const ArsFormatter = Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  currencyDisplay: 'narrowSymbol',
});

export const formatCurrency = (amount: number) => {
  return ArsFormatter.format(amount)
};
