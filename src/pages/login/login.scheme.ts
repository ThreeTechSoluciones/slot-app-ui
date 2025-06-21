import * as yup from "yup"

export const loginScheme = yup
  .object({
    username: yup.string().required('Debe ingresar el usuario'),
    password: yup.string().required('Debe ingresar la contraseña'),
  })
  .required()