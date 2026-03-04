export interface FormRef {
  submit: () => Promise<boolean>;
  getValues: () => any;
}
