import {useQuery} from "@tanstack/react-query";
import {GetOneResI} from "../../../shared/types/APITypes";
import {AxiosError} from "axios";
import Snack from "../../../shared/types/entities/Snack";
import {ResErrorsI} from "../../../api";
import useSnacksAPIs from "../api";

export default function useGetSnack(id: string) {
  const {getSnack} = useSnacksAPIs();
  return useQuery<GetOneResI<Snack>, AxiosError<ResErrorsI>>({
    queryKey: ["snacks", id],
    queryFn: () => getSnack(id),
  });
}
