import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetAllResI} from "../../../shared/types/APITypes";
import Device from "../../../shared/types/entities/Device";
import useDevicesAPIs from "../api";

export default function useGetAllDevices() {
  const {getAllDevices} = useDevicesAPIs();
  return useQuery<GetAllResI<Device>, AxiosError<ResErrorsI>>({
    queryKey: ["devices"],
    queryFn: getAllDevices,
  });
}
