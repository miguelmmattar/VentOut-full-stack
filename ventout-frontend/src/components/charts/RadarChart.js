import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { mainPalette } from '../../utils/colors';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function RadarChart({ data }) {
  const userData = {
    labels: data.map((item) => item.name),
    datasets: [{
      label: 'Occurrences',
      data: data.map((item) => item.value),
      backgroundColor: `${mainPalette.main}90`,
      brderColor: mainPalette.main,
      pointRadius: 7,
      pointBackgroundColor: data.map((item) => item.color),
      pointBorderColor: data.map((item) => item.color),

    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Radar data={userData} otions={options} />
    </>
  );
}
