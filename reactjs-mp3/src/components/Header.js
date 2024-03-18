import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";

const { FaArrowLeftLong, FaArrowRightLong } = icons;

const Header = () => {
  const navigate = useNavigate();
  const { singer } = useParams();

  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 cursor-pointer">
          <span onClick={() => navigate(-1)}>
            <FaArrowLeftLong size={24} color={singer ? "gray" : "black"} />
          </span>
          <span onClick={() => navigate(1)}>
            <FaArrowRightLong size={24} color={singer ? "gray" : "black"} />
          </span>
        </div>
        {/* end arrow */}

        <div className="w-1/2">
          <Search />
        </div>
      </div>

      <div>login</div>
    </div>
  );
};

export default Header;
