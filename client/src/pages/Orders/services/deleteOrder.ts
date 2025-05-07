import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useOrdersAPIs from "../api";

export default function useDeleteOrder() {
  const {deleteOrder} = useOrdersAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["orders"]});
    },
    onError: catchAndNotifyErrors,
  });
}
