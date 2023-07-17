import React, { useEffect, useState, useRef } from 'react';
import { Chart, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';

import { Bar } from 'react-chartjs-2';

Chart.register(LinearScale, BarController, BarElement, CategoryScale); 

const StatisticsGraphs = () => {
  const [statistics, setStatistics] = useState({});
  const chartRef = useRef(null); // Create a ref to hold the chart instance
console.log(statistics)
  useEffect(() => {
    fetch('http://localhost:4000/api/statistics')
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data);
      })
      .catch((error) => console.error('Error fetching statistics:', error));
  }, []);

  useEffect(() => {
    // Check if there's a previous chart instance and destroy it before rendering a new chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Render the new chart
    if (statistics && Object.keys(statistics).length > 0) {
      const data = {
        labels: ['Total Amount Spent', 'Pending Reimbursements', 'Settled Reimbursements', 'Rejected Reimbursements'],
        datasets: [
          {
            label: 'Statistics',
            data: [
              statistics.totalAmountSpent,
              statistics.pendingReimbursements,
              statistics.settledReimbursements,
              statistics.rejectedReimbursements,
            ],
            backgroundColor: ['#36A2EB', '#FFCE56', '#4CAF50', '#F44336'],
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      // Create a new chart instance and store it in the ref
      chartRef.current = new Chart(document.getElementById('statistics-chart'), {
        type: 'bar',
        data: data,
        options: options,
      });
    }
  }, [statistics]);

  return (
    <div>
      <h2>Organization-wide Statistics</h2>
      {Object.keys(statistics).length > 0 ? (
        <div>
          <canvas id="statistics-chart" />
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default StatisticsGraphs;
