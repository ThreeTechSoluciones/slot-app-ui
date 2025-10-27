export const formatDate = (dateArray: number[]) => {
  if (!dateArray || dateArray.length < 3) return "";
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
