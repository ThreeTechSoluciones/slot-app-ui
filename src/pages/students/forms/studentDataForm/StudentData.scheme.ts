import * as yup from 'yup';

export const StudentDataScheme = yup.object().shape({
  dni: yup
    .string()
    .required('Debe ingresar el DNI')
    .matches(/^[0-9]+$/, 'Solo se permiten números, sin puntos ni espacios')
    .max(8, 'DNI no puede tener más de 8 números'),
  name: yup.string().required('Debe ingresar el nombre'),
  lastName: yup.string().required('Debe ingresar el apellido'),
  cellphoneNumber: yup
    .string()
    .required('Debe ingresar un número de teléfono')
    .min(10, 'Debe tener al menos 10 caracteres')
    .max(11, 'No puede tener más de 11 caracteres')
    .matches(/^[0-9]+$/, 'Solo se permiten números, sin espacios'),
  pathologies: yup
    .string()
    .notRequired()
    .default(null)
    .max(250, 'No puede tener más de 250 caracteres'),
  birthday: yup
    .string()
    .required('Debe ingresar una fecha de nacimiento')
    .test('fecha-valida', 'La fecha no puede ser mayor a la actual', (value) => {
      if (!value) return false;
      const fechaIngresada = new Date(value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      return fechaIngresada <= hoy;
    })
    // Esto evita error si el campo está vacío
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    }),
});
