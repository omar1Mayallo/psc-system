import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";

export default function useResetAllDevices() {
  const {resetAllDevices} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetAllDevices,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
