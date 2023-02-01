import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function StackedBarChart({ data }) {
  const labels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const userData = {
    labels,
    datasets: data.map((item) => ({
      label: item.name,
      data: item.value,
      backgroundColor: `${item.color}95`,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datasets: {
        fillOpacity: 0,
      },
    },
  };

  return (
    <>
      <Bar data={userData} options={options} />
    </>
  );
}
