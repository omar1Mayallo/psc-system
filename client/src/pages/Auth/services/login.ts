import {useMutation} from "@tanstack/react-query";
import useAuthAPIs from "../api";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";

export default function useLogin() {
  const {login} = useAuthAPIs();
  return useMutation(login, {
    onError: catchAndNotifyErrors,
  });
}
