export interface FormProp<T> {
  onNext?: (data: T) => void;
  onBack?:() => void;
  data?: T | undefined;
}