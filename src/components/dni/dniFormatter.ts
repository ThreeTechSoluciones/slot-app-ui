const dniFormatter = (dni: string): string => {
    const vector = dni.split('');
    if (vector.length > 5) vector.splice(5, 0, '.');
    if (vector.length > 2) vector.splice(2, 0, '.');
    return vector.join('');
};
export default dniFormatter;