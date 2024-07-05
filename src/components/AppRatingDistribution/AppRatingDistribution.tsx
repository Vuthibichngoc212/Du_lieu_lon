/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface DataItem {
  rating: number;
  count: number;
}

export const AppRatingDistribution = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(
          "http://192.168.1.7:8000/app-rating-distribution/"
        );

        const result: DataItem[] = await response.json();
        setData(result);
        setError(null); // Clear any previous errors
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chart: Chart<"pie"> | null = null;

    if (chartRef.current && data.length > 0) {
      chart = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: data.map((item) => item.rating.toString()),
          datasets: [
            {
              label: "Count",
              data: data.map((item) => item.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(44, 159, 44, 0.5)",
                "rgba(140, 86, 75, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(44, 159, 44, 1)",
                "rgba(140, 86, 75, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const rating = tooltipItem.label;
                  const count = tooltipItem.raw;
                  return `Rating ${rating}: ${count}`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  return (
    <>
      {error && <div>{error}</div>}
      <canvas ref={chartRef} id="myChart"></canvas>
    </>
  );
};
