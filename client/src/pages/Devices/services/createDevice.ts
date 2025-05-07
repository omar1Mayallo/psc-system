import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";
import {EditDeviceFormData} from "../validation/useEditDeviceFormData";

export default function useCreateDevice() {
  const {createDevice} = useDevicesAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditDeviceFormData) => createDevice(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
