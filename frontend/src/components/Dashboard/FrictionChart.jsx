import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const FrictionChart = ({ data }) => {
  // Default data if none provided
  const chartData = data || {
    labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
    values: [65, 82, 68, 61, 86, 66, 71]
  }

  // Chart.js data format
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Friction Score',
        data: chartData.values,
        borderColor: '#7C5CFF',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) {
            return null
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(124, 92, 255, 0.3)')
          gradient.addColorStop(0.5, 'rgba(124, 92, 255, 0.1)')
          gradient.addColorStop(1, 'rgba(124, 92, 255, 0)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#7C5CFF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#7C5CFF',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      }
    ]
  }

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: '#9CA3AF',
        borderColor: 'rgba(124, 92, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Friction: ${context.parsed.y}%`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          }
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
          stepSize: 25,
          callback: function(value) {
            return value + '%'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  return (
    <div className="chart-card glass-card">
      <div className="chart-header">
        <h3 className="chart-title">User Friction Trend</h3>
        <select className="chart-dropdown">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="chart-container-wrapper">
        <Line data={chartConfig} options={options} />
      </div>
    </div>
  )
}

export default FrictionChart