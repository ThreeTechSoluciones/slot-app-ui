import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../../components/error_message/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import {
  MainContainer,
  Label,
  Select,
  FormContainer,
  ContentContainer,
} from "./PlanData.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import ShiftRegistrationCalendar from "../../../../components/shiftRegistrationCalendar/ShiftRegistrationCalendar";
import ShiftDetail from "../../../../components/shiftsDetail/ShiftDetail";
import { useShiftHandler } from "../../../../components/shiftRegistrationCalendar/UseShiftHandler";
import useAuthentication from "../../../../hooks/useAuthentication";
import {
  useGetSlotsQuery,
  useGetUserPlansQuery,
} from "../../../../app/services/UserService";
import type { FormProp } from "../../create-student/FormProp.type";
import { forwardRef, useImperativeHandle, useMemo, useCallback } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { DaysOfWeekReverse } from "../../../../utils/DaysOfWeek";

export interface PlanDataProps {
  planId: string;
  slotIds: string[];
}
const PlanData = forwardRef<FormProp<PlanDataProps>, FormProp<PlanDataProps>>(
  (props, ref) => {
    const { onSubmit } = props;
    const { userId } = useAuthentication();

    const { data: slotsData, isLoading: isLoadingCalendar } = useGetSlotsQuery(
      userId ? { userId } : skipToken,
    );
    const { data: planTypes } = useGetUserPlansQuery(
      userId ? { userId } : skipToken,
    );
    const schema = useMemo(() => planDataScheme(planTypes), [planTypes]);
    const { shifts, removeShift, newShift } = useShiftHandler();
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<PlanDataProps>({
      resolver: yupResolver(schema),
      defaultValues: {
        planId: "",
        slotIds: [],
      },
    });

    const userSlots = useMemo(() => {
      if (!slotsData?.length) return [];

      return slotsData.map((dayData) => ({
        day: (
          DaysOfWeekReverse[dayData.dayOfWeek]?.substring(0, 3) ??
          dayData.dayOfWeek
        ).toUpperCase(),

        shifts: dayData.slots.map((slot) => ({
          id: slot.id,
          day: dayData.dayOfWeek,
          hour: slot.startTime.substring(0, 5),
          status: slot.maxCapacity > 0 ? "Available" : "Unavailable",
        })),
      }));
    }, [slotsData]);

    const onFormSubmit = useCallback(
      (data: PlanDataProps) => {
        onSubmit?.({
          planId: data.planId,
          slotIds: shifts.map((s) => s.id),
        });
        return true;
      },
      [onSubmit, shifts],
    );
    const handleSelectShift = (id: string, day: string, hour: string) => {
      newShift(id, day, hour);

      const updated = [...shifts, { id, day, hour }].map((s) => s.id);
      setValue("slotIds", updated, { shouldValidate: true });
    };

    const handleDeleteShift = (shiftId: string) => {
      removeShift(shiftId);

      const updated = shifts.filter((s) => s.id !== shiftId).map((s) => s.id);

      setValue("slotIds", updated, { shouldValidate: true });
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
        <ContentContainer>
          <FormContainer>
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
            {isLoadingCalendar ? (
              <p>Cargando turnos...</p>
            ) : (
              <ShiftRegistrationCalendar
                listShifts={userSlots}
                selectedShifts={shifts}
                onSelectShift={handleSelectShift}
                onDeleteShift={handleDeleteShift}
              />
            )}
          </FormContainer>
          <ErrorMessage error={errors.slotIds as any} />
          <ShiftDetail shifts={shifts} />
        </ContentContainer>
      </MainContainer>
    );
  },
);

PlanData.displayName = "PlanDataForm";
export default PlanData;
