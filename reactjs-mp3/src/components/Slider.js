import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../ultis/fn";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "./";
import icons from "../ultis/icons";

var intervalId;
const { IoChevronBackSharp, MdOutlineNavigateNext } = icons;

const Sliders = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2);
  const [isAuto, setIsAuto] = useState(true);

  //animation for banner
  useEffect(() => {
    if (isAuto) {
      intervalId = setInterval(() => {
        handleAnimationBanner(1);
      }, 3000);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [min, max, isAuto]);

  const handleAnimationBanner = (step) => {
    const sliderEls = document.getElementsByClassName("slider-item");
    const list = getArrSlider(min, max, sliderEls.length - 1);

    for (let i = 0; i < sliderEls.length; i++) {
      // Delete classnames(css)
      sliderEls[i]?.classList?.remove(
        "animate-slide-right",
        "order-last",
        "z-20"
      );
      sliderEls[i]?.classList?.remove(
        "animate-slide-left",
        "order-first",
        "z-10"
      );
      sliderEls[i]?.classList?.remove("animate-slide-left2", "order-2", "z-10");

      //hide or show image
      if (list.some((item) => item === i)) {
        sliderEls[i].style.cssText = `display: block`;
      } else {
        sliderEls[i].style.cssText = `display: none`;
      }
    }

    //  Add animation by adding classnames
    list.forEach((item) => {
      if (item === max) {
        sliderEls[item]?.classList?.add(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
      } else if (item === min) {
        sliderEls[item]?.classList?.add(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
      } else {
        sliderEls[item]?.classList?.add(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );
      }
    });

    if (step === 1) {
      setMin((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
      setMax((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
    }
    if (step === -1) {
      setMin((prev) => (prev === 0 ? sliderEls.length - 1 : prev + step));
      setMax((prev) => (prev === 0 ? sliderEls.length - 1 : prev + step));
    }
  };

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  const handleBack = useCallback(
    (step) => {
      intervalId && clearInterval(intervalId);
      setIsAuto(false);
      handleAnimationBanner(step);
    },
    [min, max]
  );

  return (
    <div className=" w-full overflow-hidden px-[59px] relative">
      <Button
        text={<IoChevronBackSharp size={30} />}
        style="absolute top-1/2 left-[70px] bg-[rgba(255,255,255,0.3)] z-50 text-white p-2 rounded-full"
        handleOnClick={() => handleBack(1)}
      />
      <Button
        text={<MdOutlineNavigateNext size={30} />}
        style="absolute top-1/2 right-[70px] bg-[rgba(255,255,255,0.3)] z-50 text-white p-2 rounded-full"
        handleOnClick={() => handleBack(-1)}
      />
      <div
        onMouseLeave={(e) => setIsAuto(true)}
        className="flex w-full gap-8 pt-8 cursor-pointer"
      >
        {banner?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            onClick={() => handleClickBanner(item)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? "block" : "hidden"
            }`}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Sliders;
