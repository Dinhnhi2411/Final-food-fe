import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  
} from "@mui/material";
import { addDays, isSameDay } from "date-fns";

import { Bar } from "react-chartjs-2";
import { getArrayLastDays, setDateMDY } from "../../../utils/formatTime";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement
)
export default function Order(props) {
  const { lastestOrders, rangeDays } = props;
  
  const checkDates = (date) => {
    let result = lastestOrders?.find((order) =>
      isSameDay(new Date(+date), setDateMDY(order.day))
    );
    if (!result) return 0;
    return result.count;
  };
  const dataOrders = rangeDays.split(",")?.map((date) => {
    return checkDates(date);
  });

  const data = {
    datasets: [
      {
        label: "number of Orders",
        backgroundColor: "#00acc1",
        barPercentage: 0.5,
        barThickness: 15,
        borderRadius: 2,
        data: dataOrders.reverse(),
        maxBarThickness: 60,
      },
    ],
    labels: getArrayLastDays(7, true, addDays(new Date(), 1)).reverse(),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,

  };

  return (
    <Card>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
            Last 7 days
          </Button>
        }
        title="Latest Orders"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
}
