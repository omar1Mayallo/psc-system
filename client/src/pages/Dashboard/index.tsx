import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Head from "../../shared/components/Head";
import {OrderTypesPercentageItem, SessionTypesPercentageItem} from "./api";
import VerticalBarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import {useGetDocsCount} from "./services/getDocsCount";
import {
  useGetOrdersMonthlyProfit,
  useGetSessionsMonthlyProfit,
} from "./services/getMonthlyProfits";
import {
  useGetOrderTypesPercentage,
  useGetSessionTypesPercentage,
} from "./services/getPercentagesTypes";

export default function Dashboard() {
  // PERCENTAGE
  const {
    data: ordTypesData,
    isLoading: ordTypesLoading,
    error: ordTypesErr,
  } = useGetOrderTypesPercentage();
  const {
    data: sessionTypesData,
    isLoading: sessionTypesLoading,
    error: sessionTypesErr,
  } = useGetSessionTypesPercentage();

  // MONTHLY_PROFITS
  const {
    data: ordMonthlyData,
    isLoading: ordMonthlyLoading,
    error: ordMonthlyErr,
  } = useGetOrdersMonthlyProfit();
  const {
    data: sessionMonthlyData,
    isLoading: sessionMonthlyLoading,
    error: sessionMonthlyErr,
  } = useGetSessionsMonthlyProfit();

  // DOCS_COUNT
  const {
    data: docsCountData,
    isLoading: docsCountLoading,
    error: docsCountErr,
  } = useGetDocsCount();

  // !NOTE This is not the best practice to handle loading and error handling
  if (
    ordTypesLoading ||
    sessionTypesLoading ||
    ordMonthlyLoading ||
    sessionMonthlyLoading ||
    docsCountLoading
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (
    ordTypesErr ||
    sessionTypesErr ||
    ordMonthlyErr ||
    sessionMonthlyErr ||
    docsCountErr
  ) {
    return <Alert color="error">Fail To Load Statics</Alert>;
  }

  return (
    <Box>
      <Head h="Dashboard" />
      <Grid container spacing={2} columns={20} textAlign={"center"}>
        {Object.entries(docsCountData.data).map(([key, value]) => (
          <Grid key={key} item xs={20} sm={10} md={5} lg={4}>
            <Box
              sx={{
                backgroundColor: "#2196f3",
                borderRadius: 2,
                my: 2,
              }}
            >
              <Typography variant="h6">
                {value} {key.toUpperCase()}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VerticalBarChart dataProfits={sessionMonthlyData} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart<SessionTypesPercentageItem>
              dataPercentage={sessionTypesData}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VerticalBarChart dataProfits={ordMonthlyData} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={1}
            sx={{
              p: 2,
              maxHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart<OrderTypesPercentageItem> dataPercentage={ordTypesData} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
