import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = [
  { genre: "Action", average_rating: 5.313540107501113 },
  { genre: "Adventure", average_rating: 5.67803040082618 },
  { genre: "Animation", average_rating: 5.042376120513298 },
  { genre: "Comedy", average_rating: 5.3035770759054515 },
  { genre: "Crime", average_rating: 5.430425270357704 },
  { genre: "Documentary", average_rating: 5.033415053597595 },
  { genre: "Drama", average_rating: 5.191352149658018 },
  { genre: "Family", average_rating: 5.6863593859444315 },
  { genre: "Fantasy", average_rating: 5.366402793254587 },
  { genre: "History", average_rating: 5.7588893301285395 },
  { genre: "Horror", average_rating: 4.709666596224288 },
  { genre: "Music", average_rating: 5.783591696416766 },
  { genre: "Mystery", average_rating: 5.44658690216953 },
  { genre: "Romance", average_rating: 5.353573735769129 },
  { genre: "Science Fiction", average_rating: 5.1140603396901065 },
  { genre: "TV Movie", average_rating: 5.444942132557552 },
  { genre: "Thriller", average_rating: 5.215742249494009 },
  { genre: "War", average_rating: 5.690478451534855 },
  { genre: "Western", average_rating: 4.618188936647356 },
];

export const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Kiểm tra để đảm bảo ref không phải là null
      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: data.map((item) => item.genre),
          datasets: [
            {
              label: "Average Rating",
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

      return () => chart.destroy(); // Dọn dẹp khi component unmount
    }
  }, []);

  return <canvas ref={chartRef} id="myChart"></canvas>;
};
