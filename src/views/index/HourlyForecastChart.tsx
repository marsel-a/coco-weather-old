import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface Props {
  hourly: { time: string[]; temperature_2m: []; relativehumidity_2m: [] };
}

const HourlyForecastChart = ({ hourly }: Props) => {
  const times = hourly.time.slice(0, 24).map((t) => t.substring(t.length - 5));

  const dataHumidity = {
    labels: times,
    datasets: [
      {
        label: 'Humidity',
        data: times.map((t, idx: number) => hourly.relativehumidity_2m[idx]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      {/* <Line options={options} data={dataTemperature} /> */}
      <Line options={options} data={dataHumidity} />
    </div>
  );
};

export default HourlyForecastChart;

