import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import bgChart from "../../assets/images/anh-chill-la-gi.jpg";
import { RankList } from "../../components";
import { useSelector } from "react-redux";
import { Loading } from "../../components";

const notActivedStyle = "text-[24px] text-black py-[12px] font-semibold";
const activedStyle =
  "text-[24px] text-main-500 py-[12px] font-semibold border-b-2 border-[#0e8080]";

const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();

  useEffect(() => {
    // console.log(pid);
  }, [pid]);

  return (
    <>
      {weekChart ? (
        <div>
          <div className="relative">
            <img
              src={bgChart}
              alt="bgChart"
              className="w-full h-[500px] object-cover grayscale"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 bottom-1/2 flex px-[60px] flex-col gap-4">
              <h3 className="font-bold text-[40px] mt-[90px] text-main-500">
                Bảng Xếp Hạng Tuần
              </h3>
              <div className="flex gap-8">
                {weekChart?.map((item) => (
                  <NavLink
                    key={item.chartId}
                    to={item.link.split(".")[0]}
                    className={({ isActive }) =>
                      isActive ? activedStyle : notActivedStyle
                    }
                  >
                    {item.country === "vn"
                      ? "VIỆT NAM"
                      : item.country === "us"
                      ? "US-UK"
                      : item.country === "korea"
                      ? "K-POP"
                      : ""}
                  </NavLink>
                ))}
              </div>

              <div className="pb-18 w-full">
                <RankList
                  data={
                    weekChart?.find((item) => item?.link?.includes(pid))?.items
                  }
                  number={15}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default WeekRank;
