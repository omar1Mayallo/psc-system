import {useMutation, useQueryClient} from "@tanstack/react-query";
import useSnacksAPIs from "../api";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";

export default function useDeleteSnack() {
  const {deleteSnack} = useSnacksAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSnack(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["snacks"]});
    },
    onError: catchAndNotifyErrors,
  });
}
