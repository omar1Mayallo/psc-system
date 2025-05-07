import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import DateText from "../../../shared/components/DateText";
import useUserRole from "../../../shared/hooks/useUserRole";
import Device from "../../../shared/types/entities/Device";
import {SessionTypes} from "../../../shared/types/entities/Session";
import useEditDeviceSessionType from "../services/editDeviceSessionType";
import CounterTimer from "./Timer";
import useStartTime from "../services/startTime";
import useEndTime from "../services/endTime";
import useResetDevice from "../services/resetDevice";
import useDeleteDevice from "../services/deleteDevice";
import EditIcon from "@mui/icons-material/Edit";
export default function DeviceItem({item}: {item: Device}) {
  const navigate = useNavigate();
  const {isOwner, isUser} = useUserRole();
  const sessionTypesArr = [
    {value: SessionTypes.DUO},
    {value: SessionTypes.MULTI},
  ];

  // EDIT_DEVICE_SESSION_TYPE
  const {mutate: mutateSessionType, isLoading: isLoadingMutateSessionType} =
    useEditDeviceSessionType(item._id);

  // START_TIME
  const {mutate: mutateStartTime, isLoading: isLoadingStartTime} = useStartTime(
    item._id
  );

  // END_TIME
  const {mutate: mutateEndTime, isLoading: isLoadingEndTime} = useEndTime(
    item._id
  );

  // RESET_DEVICE
  const {mutate: mutateReset, isLoading: isResetLoading} = useResetDevice(
    item._id
  );

  // DELETE_DEVICE
  const {mutate: mutateDelete, isLoading: isDeleteLoading} = useDeleteDevice();

  return (
    <Card elevation={2} sx={{minHeight: isUser ? "256px" : "437px"}}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap:
            isUser && item.startTime
              ? 2
              : isUser
              ? 5
              : item.startTime && !item.order
              ? 2.7
              : item.startTime && item.order
              ? 2.95
              : 3.8,
        }}
      >
        {/* NAME / TYPE / DELETE&EDIT_ICON*/}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{fontSize: "15px", fontWeight: 700}}>
            {item.name.toUpperCase()}
          </Typography>
          <Chip
            label={item.type.toUpperCase()}
            color={"info"}
            size="medium"
            sx={{fontWeight: 700}}
          />
          {isOwner &&
            (isDeleteLoading ? (
              <CircularProgress size={20} color="error" />
            ) : (
              <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                <IconButton
                  aria-label="edit"
                  color="success"
                  onClick={() => {
                    navigate(`/devices/${item._id}/edit`);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => {
                    mutateDelete(item._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
        </Stack>

        {/* ID / IS_EMPTY */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip label={item._id} color={"default"} size="small" />
          <Chip
            label={item.isEmpty ? "Empty" : "Playing"}
            color={item.isEmpty ? "default" : "success"}
            size="small"
          />
        </Stack>

        {/* TIMER */}
        {item.startTime && <CounterTimer startTime={item.startTime} />}

        {/* ORDER */}
        {isUser ||
          (item.order && (
            <Typography
              sx={{fontSize: "12px", fontWeight: 600, textAlign: "center"}}
            >
              Order :{" "}
              <Link component={RouterLink} to={`/orders/${item.order}/edit`}>
                {item.order}
              </Link>
            </Typography>
          ))}

        {/* END_TIME */}
        {isUser ||
          (item.startTime && (
            <Button
              onClick={() => mutateEndTime()}
              variant="contained"
              color="error"
              size="small"
              disabled={isLoadingEndTime}
              startIcon={
                isLoadingEndTime && (
                  <CircularProgress size={15} color="inherit" />
                )
              }
            >
              {isLoadingEndTime ? "Ending" : "End Time"}
            </Button>
          ))}

        {/* MAKE_ORDER */}
        {isUser ||
          (item.startTime && !item.order && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => navigate("/orders/create")}
            >
              Make Order
            </Button>
          ))}

        {/* EDIT_SESSION_TYPE / START_TIME */}
        {isUser ||
          ((item.isEmpty || !item.startTime) && (
            <>
              <TextField
                id="outlined-select-session-type"
                size="small"
                select
                label="Set Session Type"
                defaultValue={item.sessionType}
                onChange={(e) => {
                  mutateSessionType({
                    sessionType: e.target.value as SessionTypes,
                  });
                }}
              >
                {sessionTypesArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                onClick={() => mutateStartTime()}
                variant="contained"
                size="small"
                disabled={isLoadingStartTime}
                startIcon={
                  isLoadingStartTime && (
                    <CircularProgress size={15} color="inherit" />
                  )
                }
              >
                {isLoadingStartTime ? "Starting" : "Start Time"}
              </Button>
            </>
          ))}

        {/* RESET */}
        {isUser || (
          <Button
            onClick={() => mutateReset()}
            variant="outlined"
            color="warning"
            size="small"
            disabled={
              isResetLoading ||
              (item.sessionType === SessionTypes.DUO && !item.startTime)
            }
            startIcon={
              isResetLoading && <CircularProgress size={15} color="inherit" />
            }
          >
            {isResetLoading ? "loading" : "Reset"}
          </Button>
        )}

        {/* SESSION TYPE / PRICES */}
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Chip
              label={`Session Type: ${item.sessionType}`}
              color={"warning"}
              size="small"
              icon={
                isLoadingMutateSessionType ? (
                  <CircularProgress size={15} />
                ) : undefined
              }
            />
            <Chip
              label={`Duo Price: ${item.duoPricePerHour} $`}
              color={"secondary"}
              size="small"
            />
            <Chip
              label={`Multi Price: ${item.multiPricePerHour} $`}
              color={"secondary"}
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
