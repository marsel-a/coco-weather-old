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
  daily: {
    time: string[];
    temperature_2m_min: [];
    temperature_2m_max: [];
  };
}

const DailyForecastChart = ({ daily }: Props) => {
  const times = daily.time.slice(0, 24).map((t) => t.substring(t.length - 5));
  const dataTemperature = {
    labels: times,
    datasets: [
      {
        label: 'Temperature',
        data: times.map((t, idx: number) => {
          const minTemp = daily.temperature_2m_min[idx];
          const maxTemp = daily.temperature_2m_max[idx];
          return ((minTemp + maxTemp) / 2).toFixed(1);
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  //   const dataHumidity = {
  //     labels: times,
  //     datasets: [
  //       {
  //         label: 'Humidity',
  //         data: times.map((t, idx: number) => daily.relativehumidity_2m[idx]),
  //         borderColor: 'rgb(53, 162, 235)',
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       },
  //     ],
  //   };

  return (
    <div className="flex flex-col w-full">
      <Line options={options} data={dataTemperature} />
    </div>
  );
};

export default DailyForecastChart;

