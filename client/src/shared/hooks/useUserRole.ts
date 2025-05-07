import useAuthStore from "../../app/store/auth";
import {UserRoles} from "../types/entities/User";

const useUserRole = () => {
  let userRole = "";
  let isOwner = false;
  let isUser = false;

  const user = useAuthStore((s) => s.user);
  if (user) {
    userRole = user.role;
    isOwner = userRole === UserRoles.OWNER;
    isUser = userRole === UserRoles.USER;
  }
  return {userRole, isOwner, isUser};
};

export default useUserRole;
