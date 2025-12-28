export interface FormProp<T> {
  onSubmit: (data: T) => void;
  data: T | undefined;
  actionType?: "create" | "edit";
}
