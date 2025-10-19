export interface FormProp<T> {
  onNext: (data: T) => void;
  data: T | undefined;
}