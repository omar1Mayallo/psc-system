import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {ProfitItem, ProfitsI} from "../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VerticalBarChartProps {
  dataProfits: ProfitsI<ProfitItem>;
}

function VerticalBarChart({dataProfits}: VerticalBarChartProps) {
  const {profits} = dataProfits.data;

  // Extracting the labels and values from the profits data
  const labels = profits.map((item) => {
    const {_id} = item;
    if (_id.type) {
      return `${_id.month}/${_id.year} - ${_id.type}`;
    }
    return `${_id.month}/${_id.year}`;
  });

  const values = profits.map((item) => item.value);

  // Data object for the chart
  const data = {
    labels,
    datasets: [
      {
        label: profits.some((item) => item._id.type)
          ? "Orders Monthly Profits"
          : "Sessions Monthly Profits",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
}

export default VerticalBarChart;
