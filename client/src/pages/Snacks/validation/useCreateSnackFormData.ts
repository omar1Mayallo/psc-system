import yup, {number, object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// EDIT SNACK SCHEMA OBJECT
const createSnackSchemaValidation = object({
  name: string().required(),
  quantityInStock: number().min(0).required(),
  buyingPrice: number().positive().required(),
  sellingPrice: number().positive().required(),
});

// EDIT SNACK OBJECT TYPE
export type CreateSnackFormData = yup.InferType<
  typeof createSnackSchemaValidation
>;

// EDIT SNACK FORM DATA HOOK
export default function useCreateSnackFormData() {
  return useFormValidation<CreateSnackFormData>(createSnackSchemaValidation);
}
