import * as Yup from "yup";
const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

export const FormSchema = Yup.object({
  // tele: Yup.string()
  //   .required("Telegram is required"),
  // x: Yup.string().required("X is required"),
  address: Yup.string().required("Solana address is required").min(32, 'Solana address must be at least 32 characters')
  .max(44, 'Solana address cannot be longer than 44 characters')
  .matches(base58Regex, 'Invalid Solana address format - must be base58 encoded')
});