import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Order, {
  OrderStatus,
  OrderTypes,
} from "../../../shared/types/entities/Order";
import DateText from "../../../shared/components/DateText";
import OrderSnackItem from "./OrderSnackItem";
import useDeleteOrder from "../services/deleteOrder";

export default function OrderCard({item}: {item: Order}) {
  // DELETE_SNACK_HANDLER
  const {mutate, isLoading} = useDeleteOrder();

  return (
    <Card elevation={2} sx={{minHeight: "213px"}}>
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        {/* ID / TYPE */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip label={item._id} color={"default"} size="small" />
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            {item.type === OrderTypes.IN_DEVICE && (
              <Chip label={"Device"} color={"primary"} size="small" />
            )}

            {isLoading ? (
              <CircularProgress size={25} />
            ) : (
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                  mutate(item._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* ORDER ITEMS */}
        <Stack
          direction={"row"}
          spacing={1}
          flexWrap={"nowrap"}
          overflow={"auto"}
        >
          {item.orderItems.map((ordItem, idx) => (
            <OrderSnackItem key={idx} orderSnackItem={ordItem} />
          ))}
        </Stack>

        {/* PRICE / STATUS / DATES */}
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Chip
              label={`Total Price: ${item.orderPrice} $`}
              color={"secondary"}
              size="small"
            />
            <Chip
              label={item.status}
              color={item.status === OrderStatus.DONE ? "default" : "success"}
              size="small"
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
            <DateText date={item.createdAt} preText="Created at:" />
            <DateText date={item.updatedAt} preText="Updated at:" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
