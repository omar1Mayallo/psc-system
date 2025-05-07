import yup, {number, object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// EDIT SNACK SCHEMA OBJECT
const editSnackSchemaValidation = object({
  name: string().optional(),
  quantityInStock: number().min(0).optional(),
  buyingPrice: number().min(0).optional(),
  sellingPrice: number().min(0).optional(),
});

// EDIT SNACK OBJECT TYPE
export type EditSnackFormData = yup.InferType<typeof editSnackSchemaValidation>;

// EDIT SNACK FORM DATA HOOK
export default function useEditSnackFormData() {
  return useFormValidation<EditSnackFormData>(editSnackSchemaValidation);
}
