import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useOrdersAPIs from "../api";
import {CreateOrderFormData} from "../validation/useCreateOrderFormData";

export default function useAddSnackToOrder(id: string) {
  const {addSnackToOrder} = useOrdersAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderFormData) => addSnackToOrder(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["orders", id]});
    },
    onError: catchAndNotifyErrors,
  });
}
