import React, { memo, useEffect, useState } from "react";
import { List } from "./";
import { useNavigate } from "react-router-dom";

const RankList = ({ data, isHideAlbum, number, link }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((i, index) => index < number));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);

  return (
    <div className="w-full">
      {songs?.map((item, index) => (
        <List
          key={item.encodeId}
          songData={item}
          isHideNode
          order={index + 1}
          isHideAlbum={isHideAlbum}
        />
      ))}
      <div className="flex w-full justify-center items-center">
        <button
          type="button"
          className="px-6 my-4 py-2 border border-[#0e8080] rounded-l-full rounded-r-full text-main-500 text-sm hover:text-white hover:bg-main-500 cursor-pointer "
          onClick={() =>
            link ? navigate(link.split(".")[0]) : setIsShowFull((prev) => !prev)
          }
        >
          {isShowFull ? "Ẩn bớt" : "Xem tất cả"}
        </button>
      </div>
    </div>
  );
};

export default memo(RankList);
