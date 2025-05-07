import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetOneResI} from "../../../shared/types/APITypes";
import Order from "../../../shared/types/entities/Order";
import useOrdersAPIs from "../api";

export default function useGetOrder(id: string) {
  const {getOrder} = useOrdersAPIs();
  return useQuery<GetOneResI<Order>, AxiosError<ResErrorsI>>({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
}
