import {AxiosError} from "axios";
import useDashboardAPIs, {DocsCountI} from "../api";
import {ResErrorsI} from "../../../api";
import {useQuery} from "@tanstack/react-query";

export function useGetDocsCount() {
  const {getDocsCount} = useDashboardAPIs();
  return useQuery<DocsCountI, AxiosError<ResErrorsI>>({
    queryKey: ["docs-count"],
    queryFn: getDocsCount,
  });
}
