import * as yup from "yup";
import type { PlanResponse } from "../../../../app/types/responses/PlanResponse.type";

export const planDataScheme = (plans: PlanResponse[] | undefined) => {
  return yup.object().shape({
    planId: yup.string().required("Debe seleccionar un plan"),

    slotIds: yup
      .array()
      .of(yup.string().required())
      .test(
        "match-plan-days-slots",
        "La cantidad de turnos no coincide con el plan seleccionado",
        function (value) {
          const { planId } = this.parent;

          const selectedPlan = plans?.find((p) => p.id === planId);

          if (!selectedPlan) return true;

          return value?.length === selectedPlan.numberOfDays;
        },
      )

      .required("Debes seleccionar al menos un turno"),
  });
};
