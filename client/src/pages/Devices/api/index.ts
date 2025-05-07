import {enqueueSnackbar} from "notistack";
import {
  deleteData,
  getData,
  patchData,
  postData,
  putData,
} from "../../../api/APIMethods";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import Device from "../../../shared/types/entities/Device";
import {EditSessionTypeData} from "../services/editDeviceSessionType";
import {useNavigate} from "react-router-dom";
import {EditDeviceFormData} from "../validation/useEditDeviceFormData";

const useDevicesAPIs = () => {
  const navigate = useNavigate();

  // GET_ALL_DEVICES
  async function getAllDevices() {
    const res = await getData<GetAllResI<Device>>("/devices?sort=+isEmpty");
    return res;
  }

  // CHANGE_SESSION_TYPE
  async function editDeviceSessionType(id: string, data: EditSessionTypeData) {
    const res = await patchData(`/devices/${id}/session-type`, data);
    if (res.status === 200)
      enqueueSnackbar("Successfully Edited", {variant: "success"});
  }

  // START_TIME
  async function startTime(id: string) {
    const res = await patchData(`/devices/${id}/start-time`);
    if (res.status === 200)
      enqueueSnackbar("Time Started", {variant: "success"});
  }

  // END_TIME
  async function endTime(id: string) {
    const res = await postData(`/devices/${id}/end-time`);
    if (res.status === 201) {
      enqueueSnackbar("Time Ended, New Session Added Successfully", {
        variant: "success",
      });
      navigate("/sessions");
    }
  }

  // RESET_DEVICE
  async function resetDevice(id: string) {
    const res = await putData(`/devices/${id}/reset`);
    if (res.status === 200)
      enqueueSnackbar("Device Reset Successfully", {variant: "success"});
  }

  // RESET_ALL_DEVICE
  async function resetAllDevices() {
    const res = await putData(`/devices/reset`);
    if (res.status === 200)
      enqueueSnackbar("Devices Reset Successfully", {variant: "success"});
  }

  // DELETE_DEVICE
  async function deleteDevice(id: string) {
    const res = await deleteData(`/devices/${id}`);
    if (res.status === 204) {
      enqueueSnackbar("Successfully deleted", {variant: "success"});
      navigate("/");
    }
  }

  // GET_DEVICE
  async function getDevice(id: string) {
    const res = await getData<GetOneResI<Device>>(`/devices/${id}`);
    return res;
  }

  // EDIT_DEVICE
  async function editDevice(id: string, data: EditDeviceFormData) {
    const res = await putData(`/devices/${id}`, data);
    if (res.status === 200)
      enqueueSnackbar("Successfully Edited", {variant: "success"});
  }

  // CREATE_DEVICE
  async function createDevice(data: EditDeviceFormData) {
    const res = await postData(`/devices`, data);
    if (res.status === 201) {
      enqueueSnackbar("Successfully Created", {variant: "success"});
      navigate("/");
    }
  }

  return {
    getAllDevices,
    editDeviceSessionType,
    startTime,
    endTime,
    resetDevice,
    resetAllDevices,
    deleteDevice,
    getDevice,
    editDevice,
    createDevice,
  };
};

export default useDevicesAPIs;
