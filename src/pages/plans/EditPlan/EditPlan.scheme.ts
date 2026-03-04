import * as yup from 'yup';

export const editPlanSchema = yup.object({
  name: yup.string().required('El nombre del plan es requerido'),
  numberOfDays: yup
    .number()
    .required('El número de días es requerido')
    .max(7, 'El plan no puede superar 7 días')
    .min(1, 'El plan no puede ser menor a 1 día'),
  amount: yup
    .number()
    .nullable()
    .typeError('Solo se permiten números')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)),

  startDate: yup
    .date()
    .required('La fecha de vigencia es requerida')
    .test('not-in-past', 'La fecha es anterior a hoy', (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
});

export type EditPlanFormData = yup.InferType<typeof editPlanSchema>;
