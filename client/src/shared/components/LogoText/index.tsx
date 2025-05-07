import {Typography} from "@mui/material";

export default function LogoText({my}: {my?: number | string}) {
  return (
    <Typography variant="h2" sx={{fontSize: "23px", fontWeight: "900", my}}>
      <span style={{color: "#00bfff"}}>PSC</span> Management
    </Typography>
  );
}
