const dniFormatter = (dni: string): string => {
  return dni.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export default dniFormatter;
