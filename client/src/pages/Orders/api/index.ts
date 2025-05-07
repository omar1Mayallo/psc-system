import {enqueueSnackbar} from "notistack";
import {
  deleteData,
  getData,
  patchData,
  postData,
} from "../../../api/APIMethods";
import Order from "../../../shared/types/entities/Order";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import {useNavigate} from "react-router-dom";
import {CreateOrderFormData} from "../validation/useCreateOrderFormData";

const useOrdersAPIs = () => {
  const navigate = useNavigate();
  // GET_ALL_ORDERS
  async function getAllOrders(pageParam: number, limit: number) {
    const res = await getData<GetAllResI<Order>>("/orders", {
      params: {
        page: pageParam,
        limit,
        sort: "-status,-createdAt",
      },
    });
    return res;
  }

  // GET_ORDERS
  async function getOrder(id: string) {
    const res = await getData<GetOneResI<Order>>(`/orders/${id}`);
    return res;
  }

  // DELETE_ORDERS
  async function deleteOrder(id: string) {
    const res = await deleteData(`/orders/${id}`);
    if (res.status === 204) {
      enqueueSnackbar("Successfully deleted", {variant: "success"});
      navigate("/orders");
    }
  }

  // DELETE_ALL_ORDERS
  async function deleteAllOrders() {
    const res = await deleteData(`/orders`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted all orders", {variant: "success"});
  }

  // CREATE_ORDER
  async function createOrder(data: CreateOrderFormData) {
    const res = await postData(`/orders`, data);
    if (res.status === 201) {
      enqueueSnackbar("Successfully Created", {variant: "success"});
      navigate("/orders");
    }
  }

  // ADD_SNACK_TO_ORDER
  async function addSnackToOrder(id: string, data: CreateOrderFormData) {
    const res = await patchData(`/orders/${id}/add-item`, data);
    if (res.status === 200) {
      enqueueSnackbar("Successfully Edited", {variant: "success"});
    }
  }

  return {
    getAllOrders,
    getOrder,
    deleteOrder,
    deleteAllOrders,
    createOrder,
    addSnackToOrder,
  };
};

export default useOrdersAPIs;
