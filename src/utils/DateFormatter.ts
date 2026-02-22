//para mostrarlo en el front: yyyy/mm/dd
//para enviarlo al back: yyyy-mm-dd

// yyyy/mm/dd to yyyy-mm-dd
export const formatDateToISO = (dateStr: string): string => {
  if (!dateStr) return '';

  const [day, month, year] = dateStr.split('/').map(Number);

  const date = new Date(year, month - 1, day + 1);

  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formatted;
};

export const formatDateToIsoString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const formatDateToDash = (dateInput: Date | string): string => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
