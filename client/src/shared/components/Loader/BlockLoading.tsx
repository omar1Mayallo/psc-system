import {Box, CircularProgress} from "@mui/material";

export default function BlockLoading({height = 350}: {height?: number}) {
  return (
    <Box
      sx={{
        minHeight: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
