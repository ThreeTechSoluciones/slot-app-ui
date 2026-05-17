import * as yup from 'yup';

export const verifyCodeScheme = yup.object({
  token: yup
    .string()
    .required('El código es requerido')
    .length(6, 'El código debe tener 6 dígitos'),
});
