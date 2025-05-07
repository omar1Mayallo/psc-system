import yup, {object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// REGISTER SCHEMA OBJECT
const registerSchemaValidation = object({
  username: string()
    .required("Username is required")
    .min(3, "Username minimum length 3 characters long")
    .max(30, "Username maximum length 30 characters long"),
  email: string().required("Email is required").email(),
  password: string()
    .required("Password is required")
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long"),
});

// REGISTER SCHEMA OBJECT TYPE
export type RegisterFormData = yup.InferType<typeof registerSchemaValidation>;

// REGISTER FORM DATA HOOK
export default function useRegisterFormData() {
  return useFormValidation<RegisterFormData>(registerSchemaValidation);
}
