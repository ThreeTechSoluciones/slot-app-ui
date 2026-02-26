import * as yup from 'yup';

export const EditCapacityScheme = yup.object().shape({
  capacity: yup
    .number()
    .required('Debe ingresar un número')
    .typeError('Debe ingresar un número')
    .min(1, 'El cupo debe ser al menos 1')
    .max(127, 'El cupo no puede exceder 127'),
});
