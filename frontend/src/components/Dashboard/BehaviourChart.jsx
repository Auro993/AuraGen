import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const BehaviourChart = ({ data }) => {
  // Default data if none provided
  const chartData = data || {
    labels: ['Mouse Movement', 'Wrong Clicks', 'Idle Time', 'Scroll Hesitation'],
    values: [40, 25, 20, 15],
    colors: ['#7C5CFF', '#3B82F6', '#22C55E', '#F59E0B']
  }

  // Chart.js data format
  const doughnutData = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        backgroundColor: chartData.colors,
        borderWidth: 0,
        hoverOffset: 10,
      }
    ]
  }

  // Chart options
  const options = {
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
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value}%`
          }
        }
      }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  }

  // Legend items
  const legendItems = [
    { label: 'Mouse Movement', value: '40%', color: '#7C5CFF' },
    { label: 'Wrong Clicks', value: '25%', color: '#3B82F6' },
    { label: 'Idle Time', value: '20%', color: '#22C55E' },
    { label: 'Scroll Hesitation', value: '15%', color: '#F59E0B' },
  ]

  // Behavior meanings for tooltips
  const behaviorMeanings = {
    'Mouse Movement': 'Excessive cursor movement, indicating users searching for what to do next.',
    'Wrong Clicks': 'Clicking incorrect buttons or fields repeatedly.',
    'Idle Time': 'Long pauses before interacting with the interface.',
    'Scroll Hesitation': 'Repeated scrolling up and down, suggesting users can\'t find information.'
  }

  return (
    <div className="behaviour-card glass-card">
      <h3 className="behaviour-title">Behaviour Distribution</h3>
      <div className="behaviour-content">
        <div className="behaviour-chart-wrapper">
          <Doughnut data={doughnutData} options={options} />
        </div>
        <div className="behaviour-legend">
          {legendItems.map((item, index) => (
            <div key={index} className="behaviour-legend-item">
              <div className="behaviour-legend-left">
                <span className="behaviour-legend-dot" style={{ background: item.color }}></span>
                <span className="behaviour-legend-label">{item.label}</span>
              </div>
              <span className="behaviour-legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="behaviour-meanings">
        {legendItems.map((item, index) => (
          <div key={index} className="behaviour-meaning">
            <span className="behaviour-meaning-dot" style={{ background: item.color }}></span>
            <div className="behaviour-meaning-content">
              <span className="behaviour-meaning-label">{item.label}</span>
              <span className="behaviour-meaning-text">{behaviorMeanings[item.label]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BehaviourChart