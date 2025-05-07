import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";

export default function useResetDevice(id: string) {
  const {resetDevice} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => resetDevice(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
