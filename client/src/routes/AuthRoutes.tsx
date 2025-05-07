import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../app/store/auth";
import {UserRoles} from "../shared/types/entities/User";

const AuthRoutes = () => {
  const {token} = useAuthStore();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

interface AccessibleUserRoles {
  userRole: UserRoles | UserRoles[];
}
const PrivateRoutes = ({userRole}: AccessibleUserRoles) => {
  const user = useAuthStore((s) => s.user);
  if (user) {
    const isAuthorized = Array.isArray(userRole)
      ? userRole.includes(user.role)
      : user.role === userRole;
    if (isAuthorized) {
      return <Outlet />;
    }
  }

  return <Navigate to="/" />;
};

export {AuthRoutes, PrivateRoutes};
