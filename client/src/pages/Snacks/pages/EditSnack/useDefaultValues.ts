import {useEffect, useState} from "react";
import {EditSnackFormData} from "../../validation/useEditSnackFormData";
import {GetOneResI} from "../../../../shared/types/APITypes";
import Snack from "../../../../shared/types/entities/Snack";

export default function useDefaultValues(data: GetOneResI<Snack> | undefined) {
  const [defaultValues, setDefaultValues] = useState<EditSnackFormData>({});
  useEffect(() => {
    if (data && data.data.doc) {
      const {name, quantityInStock, buyingPrice, sellingPrice} = data.data.doc;
      setDefaultValues({name, quantityInStock, buyingPrice, sellingPrice});
    }
  }, [data]);

  return defaultValues;
}
