import {Paper, Typography, Stack, Chip} from "@mui/material";
import Snack from "../../../shared/types/entities/Snack";
import {OrderItem} from "../../../shared/types/entities/Order";

export default function OrderSnackItem({
  orderSnackItem,
}: {
  orderSnackItem: OrderItem;
}) {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 1.5,
      }}
    >
      <Typography sx={{fontSize: "12px", fontWeight: 600}}>
        {(orderSnackItem.snack as Snack).name}
      </Typography>
      <Stack direction={"row"}>
        <Chip label={orderSnackItem.quantity} color={"warning"} size="small" />{" "}
        x{" "}
        <Chip
          label={`${orderSnackItem.price} $`}
          color={"error"}
          size="small"
        />
      </Stack>
    </Paper>
  );
}
