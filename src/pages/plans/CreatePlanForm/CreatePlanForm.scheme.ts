import * as yup from 'yup';

export const createPlanSchema = yup.object().shape({
  name: yup.string().required('El nombre del plan es requerido'),

  numberOfDays: yup
    .number()
    .typeError('Solo se permiten números')
    .required('El número de días es requerido')
    .min(1, 'El mínimo es 1 día por semana')
    .max(7, 'El máximo es 7 días por semana'),

  amount: yup
    .number()
    .typeError('Solo se permiten números')
    .required('El precio es requerido')
    .min(0, 'El precio no puede ser negativo'),
});
