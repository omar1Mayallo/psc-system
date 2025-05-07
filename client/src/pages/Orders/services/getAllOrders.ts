import {useInfiniteQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetAllResI} from "../../../shared/types/APITypes";
import Order from "../../../shared/types/entities/Order";
import useOrdersAPIs from "../api";

export default function useGetAllOrders(limit = 4) {
  const {getAllOrders} = useOrdersAPIs();
  return useInfiniteQuery<GetAllResI<Order>, AxiosError<ResErrorsI>>({
    queryKey: ["orders"],
    queryFn: ({pageParam = 1}) => getAllOrders(pageParam, limit),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.docs.length > 0 ? allPages.length + 1 : undefined;
    },
  });
}
