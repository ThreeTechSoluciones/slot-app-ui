export const translateStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    CREATED: "Creada",
    ON_TIME: "Pendiente",
    OUT_OF_TIME: "Vencida",
    PAYED: "Pagada",
    PAYED_OUT_OF_TIME: "Pago con atraso",
  };

  return statusMap[status] || status;
};
