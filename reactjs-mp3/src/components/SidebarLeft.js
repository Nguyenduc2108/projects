import React from "react";
import logo from "../assets/images/logo.svg";
import { sidebarMenu } from "../ultis/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[#50e3c2] text-[14px] flex gap-[12px] items-center";
const ActiveStyle =
  "py-2 px-[25px] font-bold text-[#4a90e2] text-[14px] flex gap-[12px] items-center";

const SidebarLeft = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-main-200">
      <div
        onClick={() => {
          navigate(path.HOME);
        }}
        className="logo-group w-full h-[70px] flex justify-start items-center cursor-pointer"
      >
        <img src={logo} alt="logo" className="logo-pc w-[120px] h-10 hidden" />
        <img
          src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.10.6/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
          className="logo-icon w-[95px] h-[45px]"
        />
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
            <span className="min-[1024px]:inline hidden">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
