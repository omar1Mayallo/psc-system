import {enqueueSnackbar} from "notistack";
import {deleteData, getData, postData, putData} from "../../../api/APIMethods";
import Snack from "../../../shared/types/entities/Snack";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import {EditSnackFormData} from "../validation/useEditSnackFormData";
import {useNavigate} from "react-router-dom";
import {CreateSnackFormData} from "../validation/useCreateSnackFormData";

const useSnacksAPIs = () => {
  const navigate = useNavigate();
  // GET_ALL_SNACKS
  async function getAllSnacks() {
    const res = await getData<GetAllResI<Snack>>(
      "/snacks?sort=-quantityInStock"
    );
    return res;
  }

  // GET_SNACK
  async function getSnack(id: string) {
    const res = await getData<GetOneResI<Snack>>(`/snacks/${id}`);
    return res;
  }

  // DELETE_SNACK
  async function deleteSnack(id: string) {
    const res = await deleteData(`/snacks/${id}`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted", {variant: "success"});
  }

  // EDIT_SNACK
  async function editSnack(id: string, data: EditSnackFormData) {
    const res = await putData(`/snacks/${id}`, data);
    if (res.status === 200)
      enqueueSnackbar("Successfully Edited", {variant: "success"});
  }

  // CREATE_SNACK
  async function createSnack(data: CreateSnackFormData) {
    const res = await postData(`/snacks`, data);
    if (res.status === 201) {
      enqueueSnackbar("Successfully Created", {variant: "success"});
      navigate("/snacks");
    }
  }

  return {getAllSnacks, deleteSnack, editSnack, getSnack, createSnack};
};

export default useSnacksAPIs;
