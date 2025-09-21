import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface StudentRegistrationForm {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies?: string|null; 
  paymentPlanName: string;
  extraClasses?: number; 
  classPrice?: number;   
  paymentDay?: number;   
  planId: string;
}

const initialState : StudentRegistrationForm ={
    name:"",
    lastName:"",
    dni:"",
    cellphoneNumber:"",
    birthday:"",
    pathologies:"",
    paymentPlanName:"",
    planId:"",
}

const studentRegistrationFormSlice = createSlice({
  name: 'studentDataForm',
  initialState,
  reducers: {
     setStudentData: (state, action: PayloadAction<Partial<StudentRegistrationForm>>) => {
      return { ...state, ...action.payload }
    },
    resetStudentData: () => initialState
  }
})
export const { setStudentData, resetStudentData } = studentRegistrationFormSlice.actions
export default studentRegistrationFormSlice.reducer