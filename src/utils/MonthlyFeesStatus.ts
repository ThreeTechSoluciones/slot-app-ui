export const MonthlyFeesStatusOptions = [
  { label: 'Pendiente', value: 'PENDING' },
  { label: 'Vencido', value: 'OUT_OF_TIME' },
  { label: 'Pagado', value: 'PAYED' },
  { label: 'Pagado vencido', value: 'PAYED_OUT_OF_TIME' },
];

export const MONTHLY_FEE_STATUS_CAN_BE_PAID = ['Pendiente', 'Vencido'];
export const MONTHLY_FEE_STATUS_CAN_VIEW_PAYMENT = ['Pagado', 'Pagado vencido'];
export type PAY_MONTHLY_FEE_MODAL_TYPE = 'pay';
export type PAYMENT_DETAIL_MODAL_TYPE = 'details';
