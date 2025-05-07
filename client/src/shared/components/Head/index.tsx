import {Typography} from "@mui/material";

export default function Head({h}: {h: string}) {
  return (
    <Typography variant="h6" component={"h2"} mb={2}>
      {h}
    </Typography>
  );
}
