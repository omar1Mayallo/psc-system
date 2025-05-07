import {Card, Grid, Skeleton, Stack} from "@mui/material";
import generateArrOfNum from "../../../shared/helpers/generateArrOfNum";

export const CardItemSkeleton = () => {
  return (
    <Card elevation={2} sx={{p: 3}}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Skeleton width={100} height={30} />
        <Skeleton width={70} height={30} />
      </Stack>
      <Skeleton width="100%" />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Skeleton width={30} height={25} />
        <Skeleton width={70} height={20} />
      </Stack>
    </Card>
  );
};

export default function GridListSkeleton({
  numOfItems,
  xs,
  sm,
  lg,
}: {
  [index: string]: number;
}) {
  return (
    <Grid container spacing={2} p={2}>
      {generateArrOfNum(numOfItems).map((item) => (
        <Grid item xs={xs} sm={sm} lg={lg} key={item}>
          <CardItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
