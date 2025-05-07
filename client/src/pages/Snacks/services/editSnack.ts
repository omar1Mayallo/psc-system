import {useMutation, useQueryClient} from "@tanstack/react-query";
import useSnacksAPIs from "../api";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import {EditSnackFormData} from "../validation/useEditSnackFormData";

export default function useEditSnack(id: string) {
  const {editSnack} = useSnacksAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditSnackFormData) => editSnack(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["snacks", id]});
    },
    onError: catchAndNotifyErrors,
  });
}
