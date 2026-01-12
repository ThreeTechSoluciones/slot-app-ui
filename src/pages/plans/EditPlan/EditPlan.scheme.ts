import * as yup from "yup";

export const editPlanSchema = yup.object({
  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("El precio debe ser un número válido")
    .required("Debe ingresar un nuevo precio")
    .positive("El precio debe ser mayor a 0"),
  startDate: yup.string().required("Debe seleccionar una fecha de vigencia"),
});

export type EditPlanFormData = yup.InferType<typeof editPlanSchema>;
