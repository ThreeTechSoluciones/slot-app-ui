export interface FormProp<T> {
  data?: T;
  onSubmit?: (data: T) => void;
  submit?: () => Promise<boolean>;
}
