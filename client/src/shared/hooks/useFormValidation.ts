/* eslint-disable @typescript-eslint/no-explicit-any */
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, FieldValues} from "react-hook-form";

export default function useFormValidation<T extends FieldValues = any>(
  schema: any,
  defaultValues?: any
) {
  return useForm<T>({
    resolver: yupResolver(schema),
    defaultValues,
  });
}
