import { createApi } from '@reduxjs/toolkit/query/react';
import { UserService } from './UserService';
import type { CreateStudentRequest } from '../types/requests/CreateStudentRequest.type';
import type { StudentResponse } from '../types/responses/StudentResponse.type';
import type { StudentDetailResponse } from '../types/responses/StudentDetailResponse.type';
import type { UpdateStudentRequest } from '../types/requests/UpdateStudentRequest.type';
import type { StudentMonthlyFeeResponse } from '../types/responses/StudentMonthlyFee.type';
import { SpecificSlotService } from './SpecificSlotService';
import { MetricService } from './MetricService';
import type { Page } from '../types/responses/common/Page';
import type { ActivateStudentRequest } from '../types/requests/ActivateStudentRequest.type';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const StudentService = createApi({
  reducerPath: 'students',
  tagTypes: ['Student', 'MonthlyFees'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/students`),
  endpoints: (builder) => ({
    deleteStudent: builder.mutation<void, string>({
      query: (studentId) => ({
        url: `/${studentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Student', id }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userStudents']));
        dispatch(MetricService.util.invalidateTags([{ type: 'Metric', id: 'Summary' }]));
        dispatch(UserService.util.invalidateTags(['userCalendar']));
      },
    }),

    createStudent: builder.mutation<StudentResponse, CreateStudentRequest>({
      query: (request: CreateStudentRequest) => ({
        url: '',
        method: 'POST',
        body: request,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userStudents']));
        dispatch(MetricService.util.invalidateTags([{ type: 'Metric', id: 'Summary' }]));
      },
    }),
    createStudentMonthlyFee: builder.mutation<void, { studentId: string }>({
      query: ({ studentId }) => ({
        url: `/${studentId}/monthly-fees`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { studentId }) => [{ type: 'MonthlyFees', id: studentId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          MetricService.util.invalidateTags([
            { type: 'Metric', id: 'Summary' },
            { type: 'Metric', id: 'Payment' },
          ]),
        );
      },
    }),
    getStudentMonthlyFees: builder.query<
      Page<StudentMonthlyFeeResponse>,
      {
        studentId: string;
        month?: string;
        expirationDate?: string;
        status?: string;
        paymentId?: string;
        page: number;
        size: number;
      }
    >({
      query: ({ studentId, month, expirationDate, status, paymentId, page, size }) => ({
        url: `/${studentId}/monthly-fees`,
        params: {
          page,
          size,
          month,
          expirationDate,
          status,
          paymentId,
        },
      }),
      providesTags: (_result, _error, { studentId }) => [{ type: 'MonthlyFees', id: studentId }],
    }),

    getStudentById: builder.query<StudentDetailResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),

    updateStudent: builder.mutation<void, UpdateStudentRequest>({
      query: ({ studentId, ...payload }) => ({
        url: `/${studentId}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, _error, { studentId }) => [{ type: 'Student', id: studentId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userStudents']));
        dispatch(UserService.util.invalidateTags(['userCalendar']));
      },
    }),
    activateStudent: builder.mutation<void, ActivateStudentRequest>({
      query: ({ studentId, ...body }) => ({
        url: `/${studentId}/activate`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { studentId }) => [{ type: 'Student', id: studentId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userStudents']));
        dispatch(MetricService.util.invalidateTags([{ type: 'Metric', id: 'Summary' }]));
        dispatch(UserService.util.invalidateTags(['userCalendar']));
      },
    }),
    markStudentAbsence: builder.mutation<void, { studentId: string; specificSlotId: string }>({
      query: ({ studentId, specificSlotId }) => ({
        url: `/${studentId}/slots/specific-slot/${specificSlotId}/absence`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { studentId }) => [{ type: 'Student', id: studentId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userCalendar', 'userStudents']));
        dispatch(SpecificSlotService.util.invalidateTags(['SpecificSlot']));
      },
    }),
    recoverStudentSlot: builder.mutation<void, { studentId: string; specificSlotId: string }>({
      query: ({ studentId, specificSlotId }) => ({
        url: `/${studentId}/slots/specific-slot/${specificSlotId}/recover`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { studentId }) => [{ type: 'Student', id: studentId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userCalendar', 'userStudents']));
      },
    }),
    validateStudentDni: builder.mutation<boolean, { dni: string }>({
      query: ({ dni }) => ({
        url: `/dni/${dni}/validate`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useDeleteStudentMutation,
  useCreateStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useActivateStudentMutation,
  useGetStudentMonthlyFeesQuery,
  useCreateStudentMonthlyFeeMutation,
  useMarkStudentAbsenceMutation,
  useRecoverStudentSlotMutation,
  useValidateStudentDniMutation,
} = StudentService;
