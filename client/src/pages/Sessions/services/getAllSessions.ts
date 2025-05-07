import {useInfiniteQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetAllResI} from "../../../shared/types/APITypes";
import Session from "../../../shared/types/entities/Session";
import useSessionsAPIs from "../api";

export default function useGetAllSessions(limit = 6) {
  const {getAllSessions} = useSessionsAPIs();
  return useInfiniteQuery<GetAllResI<Session>, AxiosError<ResErrorsI>>({
    queryKey: ["sessions"],
    queryFn: ({pageParam = 1}) => getAllSessions(pageParam, limit),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.docs.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}
