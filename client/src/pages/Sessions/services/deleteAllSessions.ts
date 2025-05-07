import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useSessionsAPIs from "../api";

export default function useDeleteAllSessions() {
  const {deleteAllSessions} = useSessionsAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllSessions,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["sessions"]});
    },
    onError: catchAndNotifyErrors,
  });
}
