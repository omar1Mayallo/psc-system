import {useMutation} from "@tanstack/react-query";
import useAuthAPIs from "../api";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";

export default function useRegister() {
  const {register} = useAuthAPIs();
  return useMutation(register, {
    onError: catchAndNotifyErrors,
  });
}
