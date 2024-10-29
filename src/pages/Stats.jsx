// Stats.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { progress } = useContext(ProgressContext);
  const navigate = useNavigate();

  // Datos para el gráfico circular (Doughnut)
  const doughnutData = {
    labels: ['Salud', 'Productividad', 'Creatividad'],
    datasets: [
      {
        label: 'Progreso Completado por Categoría',
        data: [
          progress.Salud,
          progress.Productividad, 
          progress.Creatividad, 
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderColor: '#222',
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de barras (Pendientes vs Completados)
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
    <div className="stats-container p-4 bg-opacity-80 bg-black rounded-lg shadow-lg">
      <div className="stats-header">
        <h2 className="text-3xl font-bold text-white">Estadísticas de Hábitos</h2>
        <button
          onClick={() => navigate('/')}
          className="button-back"
        >
          ← Regresar
        </button>
      </div>

      <div className="stats-summary flex justify-around my-6">
        <div className="stat-item text-center">
          <h3>Total Hábitos</h3>
          <p>{progress.pending + progress.completed}</p>
        </div>
        <div className="stat-item text-center">
          <h3>Completados</h3>
          <p>{progress.completed}</p>
        </div>
        <div className="stat-item text-center">
          <h3>% Cumplido</h3>
          <p>
            {progress.pending + progress.completed > 0
              ? ((progress.completed / (progress.completed + progress.pending)) * 100).toFixed(0) + '%'
              : '0%'}
          </p>
        </div>
      </div>

      <div className="legend-container flex justify-center mb-6">
        <div className="legend-item mr-4">
          <span className="legend-color" style={{ backgroundColor: '#36A2EB' }}></span> Salud
        </div>
        <div className="legend-item mr-4">
          <span className="legend-color" style={{ backgroundColor: '#FF6384' }}></span> Productividad
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FFCE56' }}></span> Creatividad
        </div>
      </div>

      <div className={`chart-container flex flex-col ${progress.completed > 0 ? 'md:flex-row' : ''} justify-center gap-8`}>
        {progress.completed > 0 && (
          <div className="doughnut-chart w-full md:w-1/3 max-w-sm">
            <Doughnut data={doughnutData} options={{ plugins: { legend: { display: false } } }} />
          </div>
        )}
        <div className={`bar-chart w-full ${progress.completed > 0 ? 'md:w-1/2' : ''} max-w-sm`}>
          <Bar data={barData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
