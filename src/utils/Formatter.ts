const ArsFormatter = Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  currencyDisplay: 'narrowSymbol',
});

export const formatCurrency = (amount: number) => {
  return ArsFormatter.format(amount);
};

export function parseDateFromString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
}
