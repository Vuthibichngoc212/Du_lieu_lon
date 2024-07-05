import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface DataItem {
  release_year: number;
  average_rating: number;
}

export const RatingOverTime = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(
          "http://192.168.1.7:8000/rating-over-time/"
        );

        const result: DataItem[] = await response.json();
        // Loại trừ các năm 2025 và 2026
        const filteredResult = result.filter(
          (item) => item.release_year !== 2025 && item.release_year !== 2026
        );

        setData(filteredResult);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        type: "line",
        data: {
          labels: data.map((item) => item.release_year),
          datasets: [
            {
              label: "Rating Over Time",
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
