import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useOrdersAPIs from "../api";
import {CreateOrderFormData} from "../validation/useCreateOrderFormData";

export default function useCreateOrder() {
  const {createOrder} = useOrdersAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderFormData) => createOrder(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["orders"]});
    },
    onError: catchAndNotifyErrors,
  });
}
