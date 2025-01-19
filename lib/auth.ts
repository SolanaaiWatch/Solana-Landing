import * as Yup from "yup";

export const FormSchema = Yup.object({
  answer: Yup.string().optional(),
});