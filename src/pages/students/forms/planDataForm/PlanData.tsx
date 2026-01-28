import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../../components/error_message/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import {
  MainContainer,
  Label,
  Select,
  FormContainer,
  PlanContainer,
  SlotDetailContainer,
} from "./PlanData.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import SlotRegistrationCalendar from "../../../../components/slotRegistrationCalendar/SlotRegistrationCalendar";
import SlotDetail from "../../../../components/slotDetail/SlotDetail";
import { useSlotHandler } from "../../../../components/slotRegistrationCalendar/UseSlotHandler";
import useAuthentication from "../../../../hooks/useAuthentication";
import {
  useGetSlotsQuery,
  useGetUserPlansQuery,
} from "../../../../app/services/UserService";
import type { FormProp } from "../../create-student/FormProp.type";
import { forwardRef, useImperativeHandle, useMemo, useCallback } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { DaysOfWeekTranslation } from "../../../../utils/DaysOfWeek";

export interface PlanDataProps {
  planId: string;
  slotIds: string[];
}
const PlanData = forwardRef<FormProp<PlanDataProps>, FormProp<PlanDataProps>>(
  (props, ref) => {
    const { onSubmit } = props;
    const { userId } = useAuthentication();

    const { data: slotsData, isLoading: isLoadingCalendar } = useGetSlotsQuery(
      userId ? { userId, dayOfWeek: "" } : skipToken,
    );
    const { data: planTypes } = useGetUserPlansQuery(
      userId ? { userId } : skipToken,
    );
    const schema = useMemo(() => planDataScheme(planTypes), [planTypes]);
    const { slots, removeSlot, newSlot } = useSlotHandler();
    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
    } = useForm<PlanDataProps>({
      resolver: yupResolver(schema),
      defaultValues: {
        planId: "",
        slotIds: [],
      },
    });

    const userSlots = useMemo(() => {
      if (!slotsData?.slots.length) return [];

      return slotsData.slots.map((dayData) => ({
        day:
          DaysOfWeekTranslation[dayData.dayOfWeek]?.substring(0, 3) ??
          dayData.dayOfWeek,

        slots: dayData.slots.map((slot) => ({
          id: slot.id,
          day: dayData.dayOfWeek,
          hour: slot.startTime,
          status:
            slot.usedCapacity < slot.maxCapacity ? "Available" : "Unavailable",
        })),
      }));
    }, [slotsData]);

    const onFormSubmit = useCallback(
      (data: PlanDataProps) => {
        onSubmit?.({
          planId: data.planId,
          slotIds: slots.map((s) => s.id),
        });
        return true;
      },
      [onSubmit, slots],
    );

    const handleSelectSlot = (id: string, day: string, hour: string) => {
      newSlot(id, day, hour);
      setValue("slotIds", getValues().slotIds.concat(id), {
        shouldValidate: true,
      });
    };

    const handleDeleteSlot = (slotId: string) => {
      removeSlot(slotId);
      setValue(
        "slotIds",
        getValues().slotIds.filter((s) => s !== slotId),
        { shouldValidate: true },
      );
    };

    useImperativeHandle(
      ref,
      () =>
        ({
          submit: () =>
            new Promise<boolean>((resolve) => {
              handleSubmit(
                async (data: PlanDataProps) => {
                  const success = onFormSubmit(data);
                  resolve(success);
                },
                () => {
                  resolve(false);
                },
              )();
            }),
        }) as unknown as FormProp<PlanDataProps>,
      [handleSubmit, onFormSubmit],
    );
    return (
      <MainContainer>
        <FormContainer>
          <PlanContainer>
            <Label>Plan</Label>
            <Select {...register("planId")}>
              <option value="" disabled hidden>
                Seleccione una opción
              </option>
              {planTypes?.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </Select>

            <ErrorMessage error={errors.planId} />
          </PlanContainer>
          {isLoadingCalendar ? (
            <p>Cargando turnos...</p>
          ) : (
            <SlotRegistrationCalendar
              listSlots={userSlots}
              selectedSlots={slots}
              onSelectSlot={handleSelectSlot}
              onDeleteSlot={handleDeleteSlot}
            />
          )}
        </FormContainer>
        <ErrorMessage error={errors.slotIds} />
        <SlotDetailContainer>
          <SlotDetail slots={slots} />
        </SlotDetailContainer>
      </MainContainer>
    );
  },
);

PlanData.displayName = "PlanDataForm";
export default PlanData;
