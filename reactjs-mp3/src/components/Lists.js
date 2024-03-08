import React, { memo } from "react";
import List from "./List";

const Lists = ({ song, totalDuration }) => {
  // console.log({ song, totalDuration });

  return (
    <div className="w-full flex flex-col text-xs text-gray-600  ">
      <div className="flex justify-between items-center p-[10px] font-semibold">
        <span>BÀI HAT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>

      <div className="flex flex-col">
        {song?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Lists);
