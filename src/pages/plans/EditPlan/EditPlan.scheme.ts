import * as yup from "yup";

export const editPlanSchema = yup.object({
  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("El precio debe ser un número válido")
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  startDate: yup
    .date()
    .required("Debe seleccionar una fecha de vigencia")
    .test("not-in-past", "Fecha inválida", (value) => {
      if (!value) return false;

      const selectedDate = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    }),
});

export type EditPlanFormData = yup.InferType<typeof editPlanSchema>;
