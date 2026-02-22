import * as yup from 'yup';

export const createPlanSchema = yup.object().shape({
  name: yup.string().required('El nombre del plan es obligatorio'),

  numberOfDays: yup
    .number()
    .typeError('Debe ingresar un número')
    .required('La cantidad de días es obligatoria')
    .min(1, 'El mínimo es 1 día por semana')
    .max(7, 'El máximo es 7 días por semana'),

  amount: yup
    .number()
    .typeError('Debe ingresar un número')
    .required('El precio es obligatorio')
    .min(0, 'El precio no puede ser negativo'),
});
