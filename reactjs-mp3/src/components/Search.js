import React from "react";
import icons from "../ultis/icons";

const { IoIosSearch } = icons;

const Search = () => {
  return (
    <div className="w-full flex items-center">
      <span className="h-10 pl-4 bg-[#dde4e4] flex items-center justify-center rounded-l-[20px] text-gray-500">
        <IoIosSearch size={20} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#dde4e4] w-full px-4 py-2 rounded-r-[20px] h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát,nghệ sĩ,lời bài hát,..."
      />
    </div>
  );
};

export default Search;
