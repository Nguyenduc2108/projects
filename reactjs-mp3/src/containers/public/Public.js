import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  Player,
  SidebarLeft,
  SidebarRight,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleScrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.zeroscrollTop(true));
    } else {
      dispatch(actions.zeroscrollTop(false));
    }
  };

  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto ">
        <div className="w-[240px] h-full flex-none ">
          <SidebarLeft />
        </div>

        <div className="flex-auto relative flex flex-col ">
          {isLoading && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-main-200 z-20 flex justify-center items-center">
              <Loading />
            </div>
          )}

          <div
            className={`h-[70px] ${
              scrollTop ? "bg-transparent" : "bg-main-300"
            }  fixed top-0 left-[240px] right-[329px] z-50 px-[59px] flex items-center`}
          >
            <Header />
          </div>

          <div className="flex-auto w-full ">
            <Scrollbars
              onScroll={handleScrollTop}
              autoHide
              style={{ width: "100%", height: "80%" }}
            >
              <Outlet />
              <div className="h-[120px] w-full"></div>
            </Scrollbars>
          </div>
        </div>

        {isShowRightSidebar && (
          <div className="w-[329px] h-screen hidden 1600:flex flex-none animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 h-[90px]">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
