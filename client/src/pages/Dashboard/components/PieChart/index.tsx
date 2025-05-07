import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";
import {
  OrderTypesPercentageItem,
  PercentageResI,
  SessionTypesPercentageItem,
} from "../../api";
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps<T> {
  dataPercentage: PercentageResI<T>;
}

const PieChart = <
  T extends OrderTypesPercentageItem | SessionTypesPercentageItem
>({
  dataPercentage,
}: PieChartProps<T>) => {
  const percentageItem = dataPercentage.data.percentage[0];

  let labels: string[] = [];
  let percentages: number[] = [];

  // Determine the labels and percentages based on the data type
  if ("InDevicePercentage" in percentageItem) {
    labels = ["IN_DEVICE Order", "OUT_DEVICE Order"];
    percentages = [
      percentageItem.InDevicePercentage,
      percentageItem.OutDevicePercentage,
    ];
  } else if ("DuoPercentage" in percentageItem) {
    labels = ["DUO Session", "MULTI Session"];
    percentages = [
      percentageItem.DuoPercentage,
      percentageItem.MultiPercentage,
    ];
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
