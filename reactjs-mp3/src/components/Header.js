import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";

const { FaArrowLeftLong, FaArrowRightLong } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full  items-center">
      <div className="flex gap-6 w-full  items-center">
        <div className="flex gap-6 text-gray-400">
          <span size={24}>
            <FaArrowLeftLong />
          </span>
          <span size={24}>
            <FaArrowRightLong />
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
