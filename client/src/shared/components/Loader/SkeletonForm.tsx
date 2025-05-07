import {Box, Skeleton} from "@mui/material";

export default function SkeletonForm() {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2.5}}>
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={40} />
    </Box>
  );
}
