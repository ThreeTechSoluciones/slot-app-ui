export const DaysOfWeek: Record<string, string> = {
  Lunes: "MONDAY",
  Martes: "TUESDAY",
  Miércoles: "WEDNESDAY",
  Jueves: "THURSDAY",
  Viernes: "FRIDAY",
  Sábado: "SATURDAY",
  Domingo: "SUNDAY",
};

export const DaysOfWeekReverse: Record<string, string> = Object.fromEntries(
  Object.entries(DaysOfWeek).map(([label, value]) => [value, label])
);
