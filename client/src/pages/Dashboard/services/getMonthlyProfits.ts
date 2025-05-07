import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import useDashboardAPIs, {ProfitItem, ProfitsI} from "../api";

export function useGetOrdersMonthlyProfit() {
  const {getOrdersMonthlyProfits} = useDashboardAPIs();
  return useQuery<ProfitsI<ProfitItem>, AxiosError<ResErrorsI>>({
    queryKey: ["orders", "monthly-profit"],
    queryFn: getOrdersMonthlyProfits,
  });
}

export function useGetSessionsMonthlyProfit() {
  const {getSessionsMonthlyProfits} = useDashboardAPIs();
  return useQuery<ProfitsI<ProfitItem>, AxiosError<ResErrorsI>>({
    queryKey: ["sessions", "monthly-profit"],
    queryFn: getSessionsMonthlyProfits,
  });
}
