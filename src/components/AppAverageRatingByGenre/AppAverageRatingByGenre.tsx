/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface DataItem {
  genre: string;
  average_rating: number;
}

export const AppAverageRatingByGenre = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.7:8000/app-average-rating-by-genre/"
        );

        const result: DataItem[] = await response.json();
        setData(result);
        setError(null); // Clear any previous errors
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chart: Chart | null = null;

    if (chartRef.current && data.length > 0) {
      chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: data.map((item) => item.genre),
          datasets: [
            {
              label: "App Average Rating By Genre",
              data: data.map((item) => item.average_rating),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              max: 10,
              beginAtZero: true,
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
