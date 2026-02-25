export interface FormProps<T> {
  data?: T;
  onSubmit?: (data: T) => void;
  actionType?: 'create' | 'edit';
}
