import {useEffect, useState} from "react";
import {GetOneResI} from "../../../../shared/types/APITypes";
import Device from "../../../../shared/types/entities/Device";
import {EditDeviceFormData} from "../../validation/useEditDeviceFormData";

export default function useDefaultValues(data: GetOneResI<Device> | undefined) {
  const [defaultValues, setDefaultValues] = useState<EditDeviceFormData>(
    {} as EditDeviceFormData
  );
  useEffect(() => {
    if (data && data.data.doc) {
      const {name, type, duoPricePerHour, multiPricePerHour} = data.data.doc;
      setDefaultValues({name, type, duoPricePerHour, multiPricePerHour});
    }
  }, [data]);

  return defaultValues;
}
