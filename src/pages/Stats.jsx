import { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Stats = () => {
  const { progress } = useContext(ProgressContext); // Accede al contexto de progreso

  // Datos para el gráfico circular de progreso por categoría
  const doughnutData = {
    labels: ['Salud', 'Productividad', 'Creatividad'],
    datasets: [
      {
        label: 'Progreso por Categoría',
        data: [progress.Salud, progress.Productividad, progress.Creatividad],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderColor: '#222',
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de barras de hábitos completados vs. pendientes
  const barData = {
    labels: ['Completados', 'Pendientes'],
    datasets: [
      {
        label: 'Hábitos',
        data: [progress.completed, progress.pending],
        backgroundColor: ['#4BC0C0', '#FF9F40'],
        hoverBackgroundColor: ['#4BC0C0', '#FF9F40'],
        borderColor: '#222',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2 className="text-2xl font-bold text-center mb-6">Estadísticas de Hábitos</h2>
      <div className="chart-container">
        <div className="doughnut-chart">
          <Doughnut data={doughnutData} />
        </div>
        <div className="bar-chart">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      min: 0,
      grid: { display: false },
      ticks: { stepSize: 1 },
    },
  },
  plugins: {
    legend: { display: false },
  },
};

export default Stats;

