import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();

    if (response?.data.err === 0) {
      //handle when success
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: response.data.data.items,
      });
    } else {
      //handle when fail
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      homeData: null,
    });
  }
};

export const zeroscrollTop = (flag) => ({
  type: actionTypes.ZERO_SCROLLTOP,
  flag,
});

export const setCurrentWidth = (w) => ({
  type: actionTypes.CURRENT_WIDTH,
  w,
});
