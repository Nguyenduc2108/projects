import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";
import path from "../ultis/path";

const { FaArrowLeftLong, FaArrowRightLong } = icons;

const Header = () => {
  const navigate = useNavigate();
  const { singer } = useParams();

  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 flex-2 cursor-pointer">
          <span onClick={() => navigate(-1)}>
            <FaArrowLeftLong size={24} color={singer ? "gray" : "black"} />
          </span>
          <span onClick={() => navigate(1)}>
            <FaArrowRightLong size={24} color={singer ? "gray" : "black"} />
          </span>
        </div>
        {/* end arrow */}

        <div className="w-2/3">
          <Search />
        </div>
      </div>

      <div className="text-sm flex flex-2 w-[24%] items-center cursor-pointer ">
        <button
          className="py-2 px-2 rounded-l-full rounded-r-full0 hover:text-main-500 font-bold"
          onClick={() => navigate(path.LOGIN)}
        >
          Đăng nhập
        </button>
        <button
          className="py-2 px-2 rounded-l-full rounded-r-full  hover:text-main-500 font-bold"
          onClick={() => navigate(path.REGISTER)}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Header;
