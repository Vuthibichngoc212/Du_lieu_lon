import "./App.css";
import { AppAverageRatingByGenre } from "./components/AppAverageRatingByGenre/AppAverageRatingByGenre";
import { AppRatingDistribution } from "./components/AppRatingDistribution/AppRatingDistribution";
import { ChartComponent } from "./components/Chart/Chart";
import { RatingDistribution } from "./components/RatingDistribution/RatingDistribution";
import { RatingOverTime } from "./components/RatingOverTime/RatingOverTime";

function App() {
  return (
    <div className="container">
      <div className="chart-ctn">
        <div className="set-width">
          <h2>Biểu đồ Đánh Giá Trung Bình Các Thể Loại</h2>
          <ChartComponent />
        </div>
      </div>

      <br></br>

      <div className="chart-ctn">
        <div className="set-width">
          <h2>Biểu đồ Đánh Giá Theo thời gian</h2>
          <RatingOverTime />
        </div>
      </div>

      <br></br>

      <div className="chart-ctn">
        <div className=" pie-chart-container">
          <h2>Biểu đồ Đánh Giá Theo xếp hạng</h2>
          <RatingDistribution />
        </div>
      </div>

      <br></br>

      <div className="chart-ctn">
        <div className="set-width">
          <h2>Biểu đồ Đánh Giá Trung Bình Các Thể Loại trong App</h2>
          <AppAverageRatingByGenre />
        </div>
      </div>

      <br></br>

      <div className="chart-ctn">
        <div className=" pie-chart-container">
          <h2>Biểu đồ Đánh Giá Theo xếp hạng trong App</h2>
          <AppRatingDistribution />
        </div>
      </div>
    </div>
  );
}

export default App;
