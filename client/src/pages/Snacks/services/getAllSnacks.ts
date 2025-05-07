import {useQuery} from "@tanstack/react-query";
import {GetAllResI} from "../../../shared/types/APITypes";
import {AxiosError} from "axios";
import Snack from "../../../shared/types/entities/Snack";
import {ResErrorsI} from "../../../api";
import useSnacksAPIs from "../api";

export default function useGetAllSnacks() {
  const {getAllSnacks} = useSnacksAPIs();
  return useQuery<GetAllResI<Snack>, AxiosError<ResErrorsI>>({
    queryKey: ["snacks"],
    queryFn: getAllSnacks,
  });
}
