import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import DateText from "../../../shared/components/DateText";
import Session from "../../../shared/types/entities/Session";
import useDeleteSession from "../services/deleteSession";
import convertHoursToTimeFormat from "../../../shared/helpers/convertHoursToTimeFormat";
import useUserRole from "../../../shared/hooks/useUserRole";

export default function SessionItem({item}: {item: Session}) {
  const {isOwner} = useUserRole();
  // DELETE_SESSION_HANDLER
  const {mutate, isLoading} = useDeleteSession();

  return (
    <Card elevation={2}>
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        {/* ID / TYPE */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip label={item._id} color={"default"} size="small" />
          {isOwner &&
            (isLoading ? (
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
            ))}
        </Stack>

        {item.device && (
          <Chip
            label={`${item.device.type} - ${item.device.name}`}
            color={"info"}
            size="small"
          />
        )}
        <Chip
          label={convertHoursToTimeFormat(item.estimatedTimeInHours)}
          color={"success"}
          size="small"
        />
        <Chip label={item.type} color={"warning"} size="small" />
        {/* PRICE  / DATES */}
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Chip
              label={`Game Price: ${item.gamePrice} $`}
              color={"secondary"}
              size="small"
            />
            <Chip
              label={`Total Price: ${item.sessionPrice} $`}
              color={"error"}
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
