import React, { useEffect, useState, useRef } from "react";
import { apiGetChartHome } from "../../apis";
import bgChart from "../../assets/images/anh-chill-la-gi.jpg";
import { SongItem, RankList, Loading } from "../../components";
import _ from "lodash";

const NewChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();

  // console.log(chartData);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setChartData(response.data.data);
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      if (chartData?.RTChart?.chart?.items) {
        for (let i = 0; i < 3; i++) {
          datasets.push({
            data: chartData?.RTChart?.chart?.items[
              Object.keys(chartData?.RTChart?.chart?.items)[i]
            ]
              ?.filter((item) => +item.hour % 2 === 0)
              ?.map((item) => item.counter),
            borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
            tension: 0.2,
            borderWidth: 2,
            pointBackgroundColor: "white",
            pointHoverRadius: 4,
            pointBorderColor:
              i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
            pointHoverBorderWidth: 4,
          });
        }
      }
      setData({ labels, datasets });
    }
  }, [chartData]);

  // console.log(chartData);

  return (
    <>
      {chartData ? (
        <div className="">
          <div className="flex flex-col">
            <div className="relative">
              <img
                src={bgChart}
                alt="bgChart"
                className="w-full h-[500px] object-cover grayscale"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 bottom-1/2 flex items-center px-[60px] ">
                <h3 className="font-bold text-[40px] text-main-500">
                  BXH Nhạc Mới
                </h3>
              </div>
            </div>
          </div>

          <div className="px-[60px] mt-12">
            <RankList data={chartData?.RTChart?.items} number={50} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default NewChart;
