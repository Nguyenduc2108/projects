import React from "react";
import {
  Sliders,
  Section,
  NewRelease,
  ChartSection,
  Artist,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Loading } from "../../components";

const Home = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };

  const {
    friday,
    chill,
    remix,
    top100,
    albumHot,
    weekChart,
    favoriteArtist,
    singers,
  } = useSelector((state) => state.app);

  return (
    <>
      {friday && chill && remix && top100 && albumHot && weekChart ? (
        <div className="overflow-y-auto w-full ">
          <div className="w-full h-[70px]"></div>
          <Sliders />
          <NewRelease />
          <Section data={chill} />
          <Section data={remix} />
          <Section data={friday} />
          <ChartSection />

          {singers && (
            <div className="px-[43px] w-full mt-12">
              <Slider {...settings}>
                {singers?.map((item) => (
                  <div key={item.id} className="px-4">
                    <Artist
                      image={item.thumbnail}
                      follower={item.totalFollow}
                      link={item.link}
                      title={item.name}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <div className="flex items-center px-[43px] w-full mt-12">
            {weekChart?.map((item) => (
              <Link
                to={item?.link?.split(".")[0]}
                key={item.link}
                className="flex-1 px-4"
              >
                <img
                  src={item.cover}
                  alt="cover"
                  className="w-full object-cover rounded-md"
                />
              </Link>
            ))}
          </div>

          {favoriteArtist && (
            <div className="mt-12 px-[59px] flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold">
                  {favoriteArtist?.title}
                </h3>
                <span className="text-xs">TẤT CẢ</span>
              </div>
              <div className="flex mx-[16px]">
                {favoriteArtist?.items
                  ?.filter((i, index) => index <= 4)
                  .map((singers) => {
                    return (
                      <div
                        key={singers.encodeId}
                        className="flex-1 px-4 relative"
                      >
                        <img
                          src={singers.thumbnail}
                          alt="singers"
                          className="w-full object-contain rounded-md"
                        />
                        <div className="absolute w-full bottom-[16px] flex justify-evenly pr-8">
                          <img
                            src={singers?.song?.items[0].thumbnail}
                            alt="singers"
                            className="w-[25%] rounded-md object-cover"
                          />
                          <img
                            src={singers?.song?.items[1].thumbnail}
                            alt="singers"
                            className="w-[25%] rounded-md object-cover"
                          />
                          <img
                            src={singers?.song?.items[2].thumbnail}
                            alt="singers"
                            className="w-[25%] rounded-md object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <Section data={top100} />
          <Section data={albumHot} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
