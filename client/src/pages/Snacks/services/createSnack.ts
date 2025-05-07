import {useMutation, useQueryClient} from "@tanstack/react-query";
import useSnacksAPIs from "../api";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import {CreateSnackFormData} from "../validation/useCreateSnackFormData";

export default function useCreateSnack() {
  const {createSnack} = useSnacksAPIs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSnackFormData) => createSnack(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["snacks"]});
    },
    onError: catchAndNotifyErrors,
  });
}
