import React from "react";
import { UseSelector, useSelector } from "react-redux";

const Player = () => {
  const { curSongId } = useSelector((state) => state.music);

  return (
    <div className="bg-main-400 px-5 h-full flex  ">
      <div className="w-[30%] flex-auto border border-red-500">Detail Song</div>
      <div className="w-[40%] flex-auto border border-red-500">Main</div>
      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
