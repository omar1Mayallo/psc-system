import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TapasIcon from "@mui/icons-material/Tapas";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SvgIcon from "@mui/material/SvgIcon";
import {UserRoles} from "../../../shared/types/entities/User";

export interface NavItem {
  navItem: string;
  NavIcon: typeof SvgIcon;
  navUrl?: string;
  isAuthorizedTo?: string | string[];
}
export const navItems: NavItem[] = [
  {navItem: "Devices", NavIcon: DevicesIcon, navUrl: "/"},
  {
    navItem: "Sessions",
    NavIcon: SportsEsportsIcon,
    navUrl: "/sessions",
    isAuthorizedTo: [UserRoles.ADMIN, UserRoles.OWNER],
  },
  {
    navItem: "Orders",
    NavIcon: ViewModuleIcon,
    navUrl: "/orders",
    isAuthorizedTo: [UserRoles.ADMIN, UserRoles.OWNER],
  },
  {
    navItem: "Snacks",
    NavIcon: TapasIcon,
    navUrl: "/snacks",
  },
  {
    navItem: "Dashboard",
    NavIcon: DashboardIcon,
    navUrl: "/dashboard",
    isAuthorizedTo: [UserRoles.OWNER],
  },
];
