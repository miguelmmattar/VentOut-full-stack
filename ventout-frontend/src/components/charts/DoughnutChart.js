import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  const userData = {
    labels: data.map((item) => item.name),
    datasets: [{
      label: 'Occurrences',
      data: data.map((item) => item.value),
      backgroundColor: data.map((item) => `${item.color}95`),
      fontColor: data.map((item) => item.color),
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Doughnut data={userData} options={options} />
    </>
  );
}
