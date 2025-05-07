import LogoutIcon from "@mui/icons-material/Logout";
import {IconButton} from "@mui/material";
import useAuthStore from "../../../app/store/auth";

export default function LogoutButton() {
  const {logout} = useAuthStore();
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={logout}
      color="inherit"
    >
      <LogoutIcon />
    </IconButton>
  );
}
