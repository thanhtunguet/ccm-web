import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueDonutChartProps {
  completedAmount: number;
  pendingAmount: number;
}

const RevenueDonutChart: React.FC<RevenueDonutChartProps> = ({
  completedAmount,
  pendingAmount,
}) => {
  const data = {
    labels: ['Đã chuyển tiền', 'Đang chờ'],
    datasets: [
      {
        data: [completedAmount, pendingAmount],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  const totalAmount = completedAmount + pendingAmount;

  return (
    <div style={{width: '300px', margin: 'auto'}}>
      <h2 style={{textAlign: 'center'}}>Tổng quan doanh thu</h2>
      <Doughnut
        data={data}
        options={options}
      />
      <div style={{textAlign: 'center', marginTop: '20px'}}>
        <p>
          Tổng doanh thu:{' '}
          {totalAmount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
    </div>
  );
};

export default RevenueDonutChart;
