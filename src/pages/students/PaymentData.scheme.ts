import * as yup from "yup";
import { PlanTypeName } from "../../app/types/models/PlanTypeName";


export const paymentDataScheme = yup.object().shape({

  paymentPlanName: yup
    .string().required("Debe seleccionar un plan de pago"),
  extraClasses: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
      })
    .notRequired()
    .when("paymentType", {
      is: (val: string) => val === PlanTypeName.PRINCIPIO_MES,
      then: (schema) =>
        schema
          .typeError("Solo se permiten números")
          .max(7, "No puede superar 7 clases")
          .notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
  classPrice:yup
    .number()
    .notRequired()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("paymentType", {
      is: (val: string) => val === PlanTypeName.PRINCIPIO_MES,
      then: (schema) =>
        schema
          .typeError("Solo se permiten números")
          .notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
  paymentDay: yup
    .number()
    .when("paymentType", {
      is: (val: string) => val === PlanTypeName.DIA_ESPECIFICO,
      then: (schema) =>
        schema
          .required("Se debe ingresar el día de pago")
          .typeError("Solo se permiten números")
          .min(11, "Se permiten pagos a partir del día 11")
          .max(28, "Se permiten pagos hasta el día 28"),
      otherwise: (schema) => schema.notRequired(),
    }),  
   
});

