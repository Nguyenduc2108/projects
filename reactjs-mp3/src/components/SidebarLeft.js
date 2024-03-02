import React from "react";
import logo from "../assets/images/logo.svg";
import { sidebarMenu } from "../ultis/menu";
import { NavLink } from "react-router-dom";

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[#50e3c2] text-[14px] flex gap-[12px] items-center";
const ActiveStyle =
  "py-2 px-[25px] font-bold text-[#4a90e2] text-[14px] flex gap-[12px] items-center";

const SidebarLeft = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center">
        <img src={logo} alt="logo" className="w-[120px] h-10 " />
      </div>

      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? ActiveStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
