import {Box, Paper} from "@mui/material";
import {Outlet} from "react-router-dom";

export default function Main() {
  return (
    <Box component={"main"}>
      <Paper variant="outlined" sx={{p: 2}} square>
        <Outlet />
      </Paper>
    </Box>
  );
}
