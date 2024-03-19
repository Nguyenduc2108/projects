import React, { memo } from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default memo(Loading);
