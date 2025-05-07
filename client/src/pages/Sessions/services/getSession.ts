import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetOneResI} from "../../../shared/types/APITypes";
import Session from "../../../shared/types/entities/Session";
import useSessionsAPIs from "../api";

export default function useGetSession(id: string) {
  const {getSession} = useSessionsAPIs();
  return useQuery<GetOneResI<Session>, AxiosError<ResErrorsI>>({
    queryKey: ["sessions", id],
    queryFn: () => getSession(id),
  });
}
