import * as yup from 'yup';
import { PaymentPlanName } from '../../../../app/types/models/PaymentPlanName';

export const paymentDataScheme = yup.object().shape({
  paymentPlanName: yup.string().required('El plan de pago es requerido'),

  extraClasses: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Solo se permiten números')
    .notRequired()
    .when(['paymentPlanName', '$actionType'], {
      is: (plan: string, actionType: string) =>
        plan === PaymentPlanName.BEGINNING_OF_MONTH && actionType !== 'edit',
      then: (schema) =>
        schema
          .typeError('Solo se permiten números')
          .max(7, 'No puede superar 7 clases')
          .min(0, 'Las clases no pueden ser negativas')
          .test('validateDay', 'Las clases extras son requeridas', (value) => {
            const today = new Date();
            const dayOfMonth = today.getDate();
            if (dayOfMonth > 10) {
              return value !== undefined && value !== null;
            }
            return true;
          })
          .notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),

  classPrice: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .typeError('Solo se permiten números')
    .notRequired()
    .when(['paymentPlanName', '$actionType'], {
      is: (plan: string, actionType: string) =>
        plan === PaymentPlanName.BEGINNING_OF_MONTH && actionType !== 'edit',
      then: (schema) =>
        schema
          .typeError('Solo se permiten números')
          .min(0, 'El precio no puede ser negativo')
          .test('validateDay', 'El precio es requerido', (value) => {
            const today = new Date();
            const dayOfMonth = today.getDate();
            if (dayOfMonth > 10) {
              return value !== undefined && value !== null;
            }
            return true;
          })
          .notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),

  paymentDay: yup
    .number()
    .typeError('Solo se permiten números')
    .when('paymentPlanName', {
      is: (val: string) => val === PaymentPlanName.SPECIFIC_DAY,
      then: (schema) =>
        schema
          .required('El día de pago es requerido')
          .typeError('Solo se permiten números')
          .min(11, 'Se permiten pagos a partir del día 11')
          .max(28, 'Se permiten pagos hasta el día 28'),
      otherwise: (schema) => schema.notRequired(),
    }),
});
