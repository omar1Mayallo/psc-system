import {Paper} from "@mui/material";
import SidebarList from "./components/SidebarList";

export default function Sidebar() {
  return (
    <Paper component={"aside"} variant="outlined" square>
      <SidebarList />
    </Paper>
  );
}
