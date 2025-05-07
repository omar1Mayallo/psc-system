/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import api from ".";
import {AxiosRequestConfig} from "axios";

export async function getData<TRes>(url: string, config?: AxiosRequestConfig) {
  const res = await api.get<TRes>(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    ...config,
  });
  return res.data;
}

export async function postData<TRes>(url: string, data?: any) {
  const res = await api.post<TRes>(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
}

export async function putData(url: string, data?: any) {
  const res = await api.put(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
}

export async function patchData(url: string, data?: any) {
  const res = await api.patch(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
}

export async function deleteData(url: string) {
  const res = await api.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
}
