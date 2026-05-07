import * as yup from 'yup';

export const restorePasswordScheme = yup.object({
  password: yup.string().required('La contraseña es requerida').min(5, 'Mínimo 5 caracteres'),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Repetí la nueva contraseña ingresada'),
});
