import * as yup from 'yup';

export const usernameScheme = yup.object({
  username: yup.string().required('El nombre de usuario es requerido'),
});
