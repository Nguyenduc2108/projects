import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActived, setIsActived] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    isActived === 0
      ? setSongs(newRelease?.items?.others)
      : setSongs(newRelease?.items?.vPop);
  }, [isActived, newRelease]);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5 ">
      <div className=" flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>

      <div className="flex items-center gap-5 text-xs">
        <button
          onClick={() => setIsActived(0)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${
            isActived === 0 ? "bg-main-500 text-white" : ""
          }`}
        >
          QUỐC TẾ
        </button>
        <button
          onClick={() => setIsActived(1)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${
            isActived === 1 ? "bg-main-500 text-white" : ""
          }`}
        >
          VIỆT NAM
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-between  ">
        {songs?.map((item) => (
          <div key={item.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              sid={item.encodeId}
              size="w-[40px] h-[40px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
