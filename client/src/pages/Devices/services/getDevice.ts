import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetOneResI} from "../../../shared/types/APITypes";
import Device from "../../../shared/types/entities/Device";
import useDevicesAPIs from "../api";

export default function useGetDevice(id: string) {
  const {getDevice} = useDevicesAPIs();
  return useQuery<GetOneResI<Device>, AxiosError<ResErrorsI>>({
    queryKey: ["devices", id],
    queryFn: () => getDevice(id),
  });
}
