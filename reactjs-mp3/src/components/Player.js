import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import { MdNextPlan, MdPreview } from "react-icons/md";
import { BiPause } from "react-icons/bi";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "./";

const {
  FaHeart,
  FaRegHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  BsRepeat,
  CiShuffle,
  IoPlay,
  FaPause,
  BsRepeat1,
  LuListMusic,
  FaVolumeUp,
  FaVolumeLow,
  FaVolumeXmark,
} = icons;

var intervalId;

const Player = ({ setIsShowRightSidebar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSecond, setCurSecond] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volumn, setVolumn] = useState(100);
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        setCurSecond(0);
        dispatch(actions.setCurSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSecond(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSecond(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volumn / 100;
  }, [volumn]);

  // play and pause music when clicked
  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  // move color matches the time when clicked progressbar
  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSecond(Math.round((percent * songInfo.duration) / 100));
  };

  // next music in playlist
  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  // previous music in playlist
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div className="bg-main-400 px-5 h-full flex   ">
      <div className="w-[30%] flex-auto  flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />

        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500 ">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2">
          <span>
            <FaRegHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto  flex flex-col items-center justify-center gap-2 py-2">
        <div className="flex gap-8 items-center justify-center">
          <span
            className={`cursor-pointer ${
              isShuffle ? "text-purple-600" : "text-black"
            }`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 hover:text-main-500 rounded-full cursor-pointer"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <FaPause size={30} />
            ) : (
              <IoPlay size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && "text-purple-600"}`}
            title="Bật phát lại tất cả"
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <BsRepeat1 size={24} />
            ) : (
              <BsRepeat size={24} />
            )}
          </span>
        </div>

        <div className="w-full flex items-center justify-center gap-3 text-xs ">
          <span className="select-none">
            {moment.utc(curSecond * 1000).format("mm:ss")}
          </span>
          <div
            className="w-3/5 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full cursor-pointer relative bg-[rgba(0,0,0,0.1)]"
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0  rounded-l-full rounded-r-full bg-[#0e8080] "
            ></div>
          </div>
          <span className="select-none">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>

      <div className="w-[30%] flex-auto flex items-center justify-end gap-4 ">
        <div className="flex gap-2 items-center cursor-pointer">
          <span onClick={() => setVolumn((prev) => (+prev === 0 ? 70 : 0))}>
            {+volumn >= 50 ? (
              <FaVolumeUp />
            ) : +volumn === 0 ? (
              <FaVolumeXmark />
            ) : (
              <FaVolumeLow />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volumn}
            onChange={(e) => setVolumn(e.target.value)}
          />
        </div>

        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100"
        >
          <LuListMusic size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
