import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";
import {SessionTypes} from "../../../shared/types/entities/Session";

export interface EditSessionTypeData {
  sessionType: SessionTypes;
}

export default function useEditDeviceSessionType(id: string) {
  const {editDeviceSessionType} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditSessionTypeData) => editDeviceSessionType(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
