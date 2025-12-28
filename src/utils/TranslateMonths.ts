const months: Record<string, string> = {
  january: "Enero",
  february: "Febrero",
  march: "Marzo",
  april: "Abril",
  may: "Mayo",
  june: "Junio",
  july: "Julio",
  august: "Agosto",
  september: "Septiembre",
  october: "Octubre",
  november: "Noviembre",
  december: "Diciembre",
};
export const translateMonth = (month: string) => {
  return months[month.toLowerCase()] || month;
};
