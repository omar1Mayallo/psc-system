import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";

export default function useEndTime(id: string) {
  const {endTime} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => endTime(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
