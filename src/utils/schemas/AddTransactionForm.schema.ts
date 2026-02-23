// validationSchema.js
import * as yup from "yup";

export const transactionSchema = yup.object({
  amount: yup
    .string()
    .required("Amount is required"),

  date: yup
    .string()
    .required("Date is required"),

  category: yup
    .string()
    .required("Category is required"),

  description: yup
    .string()
    .required("Description is required"),

});