import actionTypes from "../actions/actionTypes";

const initState = {
  banner: null,
  friday: null,
  chill: null,
  remix: null,
  top100: null,
  albumHot: null,
  isLoading: false,
  newRelease: null,
  weekChart: null,
  favoriteArtist: null,
  chart: null,
  rank: null,
  singers: null,
  scrollTop: true,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        friday:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          null,
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          null,
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || null,
        albumHot:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || null,
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          null,
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        favoriteArtist:
          action.homeData?.find((item) => item.sectionId === "hMix")?.items ||
          null,
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
        singers:
          action.homeData?.find(
            (item) => item.sectionType === "artistSpotlight"
          )?.items || null,
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case actionTypes.ZERO_SCROLLTOP:
      return {
        ...state,
        scrollTop: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
