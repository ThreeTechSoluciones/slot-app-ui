export const MonthlyFeesStatusOptions = [
  { label: 'Pendiente', value: 'PENDING' },
  { label: 'Vencido', value: 'OUT_OF_TIME' },
  { label: 'Pagado', value: 'PAYED' },
  { label: 'Pagado vencido', value: 'PAYED_OUT_OF_TIME' },
];

export const MONTHLY_FEE_STATUS_CAN_BE_PAID = ['Pendiente', 'Vencido'];
export const MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT = ['Pagado', 'Pagado vencido'];

export enum ModalType {
  PAY_MONTHLY_FEE = 'pay',
  PAYMENT_DETAIL = 'payment_details',
  NEW_MONTLHY_FEE = 'new_monthly_fee',
}
