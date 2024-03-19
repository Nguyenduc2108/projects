import React from "react";
import { Link } from "react-router-dom";
import path from "../../ultis/path";

const Personal = () => {
  return (
    <div className="mt-[90px] px[59px]">
      <div className="px-[59px] mt-[90px]">
        <h1 className="text-[40px] font-bold">Thư viện</h1>

        <div className=" flex w-full gap-8 mt-[90px] pb-4 border-b border-main-500 text-sm ">
          <span>BÀI HÁT</span>
          <span>ALBUM</span>
          <span>MV</span>
        </div>
      </div>
      <div className="relative  mt-[100px] left-[40%] ">
        <Link
          className="inline-block p-4 border border-main-500 bg-main-500 text-white rounded-l-full rounded-r-full cursor-pointer"
          to={path.PUBLIC}
        >
          Khám phá ngay
        </Link>
      </div>
    </div>
  );
};

export default Personal;
