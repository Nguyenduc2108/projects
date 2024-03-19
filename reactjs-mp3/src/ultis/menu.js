import icons from "./icons";

const { MdOutlineLibraryMusic, TbChartArcs, BiSolidChart, MdOutlineFeed } =
  icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Thư viện",
    icons: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icons: <BiSolidChart size={24} />,
  },
  {
    path: "moi-phat-hanh",
    text: "BXH nhạc mới",
    icons: <MdOutlineFeed size={24} />,
  },
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
  {
    // path: "moi-phat-hanh",
    // text: "MỚI PHÁT HÀNH",
    // icons: <MdOutlineFeed size={24} />,
  },
];
