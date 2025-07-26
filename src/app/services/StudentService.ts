import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateStudentRequest } from '../types/requests/CreateStudentRequest.type';
import type { StudentResponse } from '../types/responses/StudentResponse.type';
import type { StudentDetailResponse } from '../types/responses/StudentDetailResponse.type';

export const StudentService = createApi({
  reducerPath: 'student',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/students` }),
  endpoints: (builder) => ({
    createStudent: builder.mutation<StudentResponse, CreateStudentRequest> ({
      query: (request: CreateStudentRequest) => ({
        url: '',
        method: 'POST',
        body: request
      })
    }),
    getStudentById: builder.query<StudentDetailResponse, string>({
      query: (id) => `/${id}`
    })
  })
})

export const { useCreateStudentMutation, useGetStudentByIdQuery } = StudentService