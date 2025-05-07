import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";
import {EditDeviceFormData} from "../validation/useEditDeviceFormData";

export default function useEditDevice(id: string) {
  const {editDevice} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditDeviceFormData) => editDevice(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices", id]});
    },
    onError: catchAndNotifyErrors,
  });
}
