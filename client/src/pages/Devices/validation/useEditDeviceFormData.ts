import yup, {number, object, string} from "yup";
import useFormValidation from "../../../shared/hooks/useFormValidation";

// EDIT DEVICE SCHEMA OBJECT
const editDeviceSchemaValidation = object({
  name: string().required(),
  type: string().required(),
  multiPricePerHour: number().positive().required(),
  duoPricePerHour: number().positive().required(),
});

// EDIT DEVICE OBJECT TYPE
export type EditDeviceFormData = yup.InferType<
  typeof editDeviceSchemaValidation
>;

// EDIT DEVICE FORM DATA HOOK
export default function useEditDeviceFormData() {
  return useFormValidation<EditDeviceFormData>(editDeviceSchemaValidation);
}
