// validationSchema.js
import * as yup from "yup";

export const budgetSchema = yup.object({
  amount: yup
    .string()
    .required("Amount is required"),

});