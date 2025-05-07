import yup, {number, object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// CREATE ORDER SCHEMA OBJECT
const createOrderSchemaValidation = object({
  snackId: string().required(),
  quantity: number().positive().required(),
  deviceId: string().optional(),
});

// CREATE ORDER OBJECT TYPE
export type CreateOrderFormData = yup.InferType<
  typeof createOrderSchemaValidation
>;

// CREATE ORDER FORM DATA HOOK
export default function useCreateOrderFormData() {
  return useFormValidation<CreateOrderFormData>(createOrderSchemaValidation);
}
