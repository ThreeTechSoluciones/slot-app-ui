const dniFormatter = (dni: string | number): string => {
  return dni.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export default dniFormatter;
