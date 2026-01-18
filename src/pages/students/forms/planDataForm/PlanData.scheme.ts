import * as yup from "yup";

export const planDataScheme = yup.object().shape({
  planId: yup.string().required("Debe seleccionar un plan"),

  slotIds: yup
    .array()
    .of(yup.string().required())
    .test(
      "match-plan-days",
      "La cantidad de turnos no coincide con el plan seleccionado",
      function (value) {
        const { shiftsLength, planDays } = this.options.context || {};

        if (!planDays) return true;
        if (!shiftsLength) return false;

        return shiftsLength === planDays;
      },
    )
    .required("Debes seleccionar al menos un turno"),
});
