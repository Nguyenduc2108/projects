import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";
import icons from "../../ultis/icons";
import { SongItem, Section, Artist } from "../../components";

const { AiOutlineUserAdd, IoPlay } = icons;

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    singer && fetchArtistData();
  }, [singer]);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);

  // console.log(artistData);

  return (
    <div className="flex flex-col w-full">
      {/* <img src={artistData?.cover} alt="background" className="mt-[70px]" /> */}
      <div ref={ref} className="relative">
        <div className="bg-[rgba(15,112,113,0.5)] w-full h-[400px] "></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to transparent px-[60px text-white">
          <div className="absolute bottom-0 pb-6 px-[60px] flex gap-8">
            <img
              src={artistData?.thumbnail}
              alt="avatar"
              className="w-[140px] h-[140px] object-cover rounded-full"
            />
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
                <span
                  className="p-3 rounded-full relative bg-white text-main-500  hover:text-gray-100  cursor-pointer"
                  onMouseEnter={() => setIsHoverPlay(true)}
                  onMouseLeave={() => setIsHoverPlay(false)}
                >
                  <div className="w-8 h-8"></div>
                  {isHoverPlay && (
                    <span className="absolute animate-scale-up-center top-[-1px] left-[-1px] bottom-[-1px] right-[-1px] bg-main-500 rounded-full"></span>
                  )}
                  <span className="absolute p-2 top-1 left-1 bottom-0 right-0 z-50 ">
                    <IoPlay size={32} />
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-sm text-gray-200">{`${Number(
                  artistData?.totalFollow.toFixed(1)
                ).toLocaleString()} người quan tâm`}</span>

                <button
                  type="button"
                  className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
                >
                  <span>
                    <AiOutlineUserAdd />
                  </span>
                  <span className="text-xs opacity-90">QUAN TÂM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[30px] px-[60px] w-full flex">
        {/* <div className="w-[40%] flex-auto">
          <h3 className="mb-5 font-bold text-[20px]">Mới nhất</h3>
          <div className="flex gap-4 p-4 pr-11 bg-[#c4cdcc] rounded-md  ">
            <img
              src={artistData?.topAlbum?.thumbnail}
              alt="thumbnail"
              className="w-[151px] h-[151px] object-cover rounded-md"
            />

            <div className="flex flex-col text-xs gap-[12px] opacity-80 text-black">
              <span>{artistData?.topAlbum?.textType}</span>
              <div className="flex flex-col ">
                <span className="text-sm font-bold opacity-100">
                  {artistData?.topAlbum?.title}
                </span>
                <span>{artistData?.topAlbum?.artistsNames}</span>
              </div>
              <span>{artistData?.topAlbum?.releaseDate}</span>
            </div>
          </div>
        </div> */}

        <div className="w-full flex-auto">
          <h3 className="mb-5 font-bold text-[20px]">Bài hát nổi bật</h3>
          <div className="flex flex-wrap w-full justify-between ">
            {artistData?.sections
              ?.find((item) => item.sectionType === "song")
              ?.items?.filter((item, index) => index < 6)
              ?.map((item) => (
                <div
                  key={item.encodeId}
                  className="w-[90%] min-[1024px]:w-[48%]"
                >
                  <div className="w-full border-b border-gray-400  mr-5 ">
                    <SongItem
                      thumbnail={item.thumbnail}
                      title={item.title}
                      artists={item.artistsNames}
                      sid={item.encodeId}
                      size="w-[40px] h-[40px]"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {artistData?.sections
        ?.filter((item) => item.sectionType === "playlist")
        ?.map((item, index) => (
          <Section key={index} data={item} />
        ))}

      <div className="flex flex-col w-full px-[60px] mt-12">
        <h3 className="text-lg font-bold mb-5">
          {
            artistData?.sections?.find((item) => item.sectionType === "artist")
              ?.title
          }
        </h3>
        <div className="flex gap-[28px]">
          {artistData?.sections
            ?.find((item) => item.sectionType === "artist")
            ?.items?.filter((i, index) => index <= 4)
            ?.map((item) => (
              <Artist
                key={item.id}
                title={item.name}
                image={item.thumbnailM}
                follower={item.totalFollow}
                link={item.link}
              />
            ))}
        </div>
      </div>

      <div className="px-[60px] mt-12">
        <h3 className="text-lg font-bold mb-5">{`Về ${artistData?.name}`}</h3>
        <div className="flex gap-8">
          <img
            src={artistData?.thumbnailM}
            alt="thumbnail"
            className="w-[45%] h-[375px] flex-none object-cover rounded-md"
          />
          <div className="flex flex-col gap-8 text-xs">
            <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
            <div className="flex flex-col gap-2 ">
              <span className="text-[20px] font-bold">
                {Number(artistData?.follow?.toFixed(1).toLocaleString())}
              </span>
              <span>Người quan tâm</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Singer;
