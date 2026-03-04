import * as yup from 'yup';

export const EditCapacityScheme = yup.object().shape({
  capacity: yup
    .number()
    .required('La capacidad es requerida')
    .typeError('Solo se permiten números')
    .min(1, 'El cupo debe ser al menos 1')
    .max(127, 'El cupo no puede exceder 127'),
});
