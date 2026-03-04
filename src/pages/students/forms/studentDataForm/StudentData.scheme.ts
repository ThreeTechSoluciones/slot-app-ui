import * as yup from 'yup';

export const StudentDataScheme = yup.object().shape({
  dni: yup
    .string()
    .required('El DNI es requerido')
    .matches(/^[0-9]+$/, 'Solo se permiten números, sin puntos ni espacios')
    .max(8, 'El DNI no puede tener más de 8 dígitos'),
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  cellphoneNumber: yup
    .string()
    .required('El número de teléfono es requerido')
    .min(10, 'El número debe tener al menos 10 dígitos')
    .max(11, 'El número no puede tener más de 11 dígitos')
    .matches(/^[0-9]+$/, 'Solo se permiten números, sin espacios'),
  pathologies: yup
    .string()
    .notRequired()
    .default(null)
    .max(250, 'La descripción no puede tener más de 250 caracteres'),
  birthday: yup
    .string()
    .required('La fecha de nacimiento es requerida')
    .test('fecha-valida', 'La fecha no puede ser posterior a hoy', (value) => {
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
