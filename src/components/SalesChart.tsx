"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface SalesChartProps {
  data: { month: string; sales: number }[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Sales (৳)",
            data: data.map((item) => item.sales),
            borderColor: "#4A4FCF",
            backgroundColor: "rgba(74, 79, 207, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#4A4FCF",
            pointBorderColor: "#B8AEEA",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#a1a1aa",
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#a1a1aa",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#a1a1aa",
              callback: function (value) {
                return "৳" + value;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Sales Overview</h2>
      <div className="h-64">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-400">
            No sales data available
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </div>
  );
};

export default SalesChart;