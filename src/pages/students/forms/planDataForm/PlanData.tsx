import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../../components/error_message/ErrorMessage';
import { planDataScheme } from './PlanData.scheme';
import * as s from './PlanData.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import SlotRegistrationCalendar from '../../../../components/slotRegistrationCalendar/SlotRegistrationCalendar';
import SlotDetail from '../../../../components/slotDetail/SlotDetail';
import { useSlotHandler } from '../../../../components/slotRegistrationCalendar/UseSlotHandler';
import useAuthentication from '../../../../hooks/useAuthentication';
import { useGetSlotsQuery, useGetUserPlansQuery } from '../../../../app/services/UserService';
import type { FormProps } from '../../../../app/types/FormProp';
import { forwardRef, useImperativeHandle, useMemo, useCallback, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { DaysOfWeekTranslation } from '../../../../utils/DaysOfWeek';
import CalendarIcon from '../../../../assets/calendar-icon.svg';
import CaretIcon from '../../../../assets/caret-icon.svg';
import type { FormRef } from '../../../../app/types/FormRef';
import Spinner from '../../../../components/spinner/Spinner';

export interface PlanDataProps {
  planId: string;
  slotIds: string[];
}
const PlanData = forwardRef<FormRef, FormProps<PlanDataProps>>((props, ref) => {
  const { data, onSubmit: onSubmit } = props;
  const { userId } = useAuthentication();

  const { data: slotsData, isLoading: isLoadingCalendar } = useGetSlotsQuery(
    userId ? { userId, dayOfWeek: '' } : skipToken,
  );

  const page = 1;

  const size = 100;

  const { data: planTypes } = useGetUserPlansQuery(
    userId ? { userId, page: page - 1, size } : skipToken,
  );

  const schema = useMemo(() => planDataScheme(planTypes?.content), [planTypes]);

  const DEFAULT_PLAN_DATA: PlanDataProps = {
    planId: '',
    slotIds: [],
  };

  const studentRegistrationForm = data ?? DEFAULT_PLAN_DATA;

  const { slots, removeSlot, newSlot } = useSlotHandler(
    (studentRegistrationForm as any).slots?.map((s: any) => ({
      id: s.slotId,
      day: DaysOfWeekTranslation[s.dayOfWeek].substring(0, 3).toUpperCase() ?? s.dayOfWeek,
      hour: s.startTime,
    })) ?? [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PlanDataProps>({
    resolver: yupResolver(schema),
    defaultValues: { ...studentRegistrationForm },
  });

  useEffect(() => {
    setValue(
      'slotIds',
      slots.map((s) => s.id),
    );
  }, [slots]);

  const userSlots = useMemo(() => {
    if (!slotsData?.slots.length) return [];

    return slotsData.slots.map((dayData) => ({
      day: DaysOfWeekTranslation[dayData.dayOfWeek]?.substring(0, 3) ?? dayData.dayOfWeek,
      slots: dayData.slots.map((slot) => ({
        id: slot.id,
        day: dayData.dayOfWeek,
        hour: slot.startTime,
        status: slot.usedCapacity < slot.maxCapacity ? 'Available' : 'Unavailable',
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

  useImperativeHandle(
    ref,
    () => ({
      submit: () =>
        new Promise<boolean>((resolve) => {
          handleSubmit(
            async (data) => {
              const success = onFormSubmit(data);
              resolve(success);
            },
            () => {
              resolve(false);
            },
          )();
        }),
      getValues: () => getValues(),
    }),
    [handleSubmit, onFormSubmit, getValues],
  );

  const handleSelectSlot = (id: string, day: string, hour: string) => {
    newSlot(id, day, hour);
    setValue('slotIds', getValues().slotIds.concat(id), {
      shouldValidate: true,
    });
  };

  const handleDeleteSlot = (slotId: string) => {
    removeSlot(slotId);
    setValue(
      'slotIds',
      getValues().slotIds.filter((s) => s !== slotId),
      { shouldValidate: true },
    );
  };
  return (
    <s.MainContainer>
      <s.FormContainer>
        <s.PlanContainer>
          <s.Label>Plan</s.Label>
          <s.SelectWrapper>
            <s.Select {...register('planId')}>
              <option value="" disabled hidden>
                Seleccione una opción
              </option>
              {planTypes?.content.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </s.Select>

            <s.CaretIcon src={CaretIcon} alt="caret-icon" />
          </s.SelectWrapper>

          <ErrorMessage error={errors.planId} />
        </s.PlanContainer>
        {isLoadingCalendar ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <Spinner text="Cargando turnos..." />
          </div>
        ) : (
          <SlotRegistrationCalendar
            listSlots={userSlots}
            selectedSlots={slots}
            onSelectSlot={handleSelectSlot}
            onDeleteSlot={handleDeleteSlot}
          />
        )}
      </s.FormContainer>
      <ErrorMessage error={errors.slotIds} />
      <s.SlotsContainer>
        <s.SlotTitleContainer>
          <img src={CalendarIcon} width={'24px'} height={'24px'}></img>
          Turnos asignados
        </s.SlotTitleContainer>
        <s.SlotDetailContainer>
          <SlotDetail slots={slots} />
        </s.SlotDetailContainer>
      </s.SlotsContainer>
    </s.MainContainer>
  );
});

PlanData.displayName = 'PlanDataForm';
export default PlanData;
