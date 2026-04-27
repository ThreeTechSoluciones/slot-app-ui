import * as yup from 'yup';

export interface StudentDataFormValues {
  dni: string;
  name: string;
  lastName: string;
  cellphoneNumber: string;
  email: string;
  pathologies: string | null;
  birthday: string;
}

export const StudentDataScheme: yup.ObjectSchema<StudentDataFormValues> = yup.object({
  dni: yup
    .string()
    .required('El DNI es requerido')
    .matches(/^[0-9]+$/, 'Solo se permiten numeros, sin puntos ni espacios')
    .max(8, 'El DNI no puede tener mas de 8 digitos'),
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  cellphoneNumber: yup
    .string()
    .required('El numero de telefono es requerido')
    .min(10, 'El numero debe tener al menos 10 digitos')
    .max(11, 'El numero no puede tener mas de 11 digitos')
    .matches(/^[0-9]+$/, 'Solo se permiten numeros, sin espacios'),
  email: yup
    .string()
    .defined()
    .default('')
    .test(
      'email-valido',
      'Debe ser un email valido',
      (value) => !value || yup.string().email().isValidSync(value),
    )
    .max(50, 'El email no puede tener mas de 50 caracteres'),
  pathologies: yup
    .string()
    .nullable()
    .default(null)
    .max(250, 'La descripcion no puede tener mas de 250 caracteres'),
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
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    }),
});
