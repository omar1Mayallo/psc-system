import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import useDashboardAPIs, {
  OrderTypesPercentageItem,
  PercentageResI,
  SessionTypesPercentageItem,
} from "../api";

export function useGetOrderTypesPercentage() {
  const {getOrderTypesPercentages} = useDashboardAPIs();
  return useQuery<
    PercentageResI<OrderTypesPercentageItem>,
    AxiosError<ResErrorsI>
  >({
    queryKey: ["orders", "types-percentages"],
    queryFn: getOrderTypesPercentages,
  });
}

export function useGetSessionTypesPercentage() {
  const {getSessionsTypesPercentages} = useDashboardAPIs();
  return useQuery<
    PercentageResI<SessionTypesPercentageItem>,
    AxiosError<ResErrorsI>
  >({
    queryKey: ["sessions", "types-percentages"],
    queryFn: getSessionsTypesPercentages,
  });
}
