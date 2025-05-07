import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useOrdersAPIs from "../api";

export default function useDeleteAllOrders() {
  const {deleteAllOrders} = useOrdersAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllOrders,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["orders"]});
    },
    onError: catchAndNotifyErrors,
  });
}
