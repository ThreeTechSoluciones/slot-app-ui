import * as yup from 'yup';

export const editPlanSchema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  numberOfDays: yup
    .number()
    .required('El número de días es requerido')
    .max(7, 'No puede superar 7 días')
    .min(1, 'No puede ser menor a 1 día'),
  amount: yup
    .number()
    .nullable()
    .typeError('El precio debe ser un número válido')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)),

  startDate: yup
    .date()
    .required('Debe seleccionar una fecha de vigencia')
    .test('not-in-past', 'La fecha es menor al día actual', (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
});

export type EditPlanFormData = yup.InferType<typeof editPlanSchema>;
