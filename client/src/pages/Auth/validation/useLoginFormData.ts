import yup, {object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// LOGIN SCHEMA OBJECT
const loginSchemaValidation = object({
  email: string().required("Email is required").email(),
  password: string()
    .required("Password is required")
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long"),
});

// LOGIN SCHEMA OBJECT TYPE
export type LoginFormData = yup.InferType<typeof loginSchemaValidation>;

// LOGIN FORM DATA HOOK
export default function useLoginFormData() {
  return useFormValidation<LoginFormData>(loginSchemaValidation);
}
