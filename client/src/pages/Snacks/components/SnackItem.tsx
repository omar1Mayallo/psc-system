import {Box, Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import DateText from "../../../shared/components/DateText";
import useUserRole from "../../../shared/hooks/useUserRole";
import MutationMenu from "./MutationMenu";
import Snack from "../../../shared/types/entities/Snack";
import {useParams} from "react-router-dom";

export default function SnackItem({...item}: Snack) {
  const {isOwner, isUser} = useUserRole();
  const {
    createdAt,
    updatedAt,
    name,
    _id,
    buyingPrice,
    sellingPrice,
    quantityInStock,
    sold,
  } = item;

  const {snackId} = useParams();
  return (
    <Card elevation={2}>
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* NAME */}
          <Typography
            variant="h6"
            component="h2"
            sx={{fontWeight: 500, fontSize: "15px"}}
          >
            {name.toUpperCase()}
          </Typography>

          {/* QTY, SOLD, MUTATION_ICON */}
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <Chip
              label={
                quantityInStock > 0 ? `Qty: ${quantityInStock}` : "Sold Out"
              }
              color={quantityInStock > 0 ? "primary" : "error"}
              size="small"
            />
            {isUser || (
              <Chip label={`Sold: ${sold}`} color={"success"} size="small" />
            )}
            {isOwner && !snackId && <MutationMenu id={_id} />}
          </Stack>
        </Stack>

        {/* ID */}
        <Typography variant="body2" color="text.secondary">
          ID: {_id}
        </Typography>

        {/* PRICE */}
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            {isOwner && (
              <Chip
                label={`Buy Price: ${buyingPrice} $`}
                color={"warning"}
                size="small"
              />
            )}
            <Chip
              label={`Sell Price: ${sellingPrice} $`}
              color={"secondary"}
              size="small"
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
            <DateText date={createdAt} preText="Created at:" />
            <DateText date={updatedAt} preText="Updated at:" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
