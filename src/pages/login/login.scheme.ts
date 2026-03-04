import * as yup from 'yup';

export const loginScheme = yup
  .object({
    username: yup.string().required('El nombre de usuario es requerido'),
    password: yup.string().required('La contraseña es requerida'),
  })
  .required();
