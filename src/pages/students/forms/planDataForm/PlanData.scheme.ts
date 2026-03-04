import * as yup from 'yup';
import type { PlanResponse } from '../../../../app/types/responses/PlanResponse.type';

export const planDataScheme = (plans: PlanResponse[] | undefined) => {
  return yup.object().shape({
    planId: yup.string().required('El plan es requerido'),

    slotIds: yup
      .array()
      .of(yup.string().required())
      .default([])
      .test('match-plan-days-slots', function (value) {
        const { planId } = this.parent;
        const selectedPlan = plans?.find((p) => p.id === planId);
        if (!selectedPlan) return true;
        if (value?.length !== selectedPlan.numberOfDays) {
          if (!value?.length) {
            return this.createError({
              message: 'Debe seleccionar al menos un turno',
            });
          }
          if (value.length !== selectedPlan.numberOfDays) {
            return this.createError({
              message: `El plan requiere ${selectedPlan.numberOfDays} ${selectedPlan.numberOfDays === 1 ? 'turno' : 'turnos'}, actualmente tenés ${value.length} seleccionado${value.length === 1 ? '' : 's'}`,
            });
          }
        }
        return true;
      }),
  });
};
