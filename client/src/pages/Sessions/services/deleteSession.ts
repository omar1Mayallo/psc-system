import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useSessionsAPIs from "../api";

export default function useDeleteSession() {
  const {deleteSession} = useSessionsAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["sessions"]});
    },
    onError: catchAndNotifyErrors,
  });
}
