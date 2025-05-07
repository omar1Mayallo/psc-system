import Cookies from "js-cookie";
import {enqueueSnackbar} from "notistack";
import {useEffect} from "react";
import {create} from "zustand";
import {getData} from "../../api/APIMethods";
import User from "../../shared/types/entities/User";
import {GetOneResI} from "../../shared/types/APITypes";

interface AuthStore {
  token: string | null;
  setToken: (userToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  user: User | null;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: Cookies.get("token") || null,
  setToken: (userToken: string) => {
    Cookies.set("token", userToken, {expires: 10});
    set({token: Cookies.get("token")});
  },
  user: null,
  setUser: (user: User) => {
    set({user});
  },
  logout: () => {
    enqueueSnackbar("Successfully logged out", {variant: "success"});
    Cookies.remove("token");
    set({token: null, user: null});
  },
}));

export const useLoggedUser = () => {
  const setUser = useAuthStore((s) => s.setUser);

  async function getLoggedUser() {
    const res = await getData<GetOneResI<User>>("/users/my-profile");
    setUser(res.data.doc);
  }

  useEffect(() => {
    getLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuthStore;
