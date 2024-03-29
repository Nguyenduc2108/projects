import React, { useEffect } from "react";
import { Lists, List, Loading } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  // console.log(searchData);

  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="w-full px-[60px]">
      <Lists isHideTime={true} />
    </div>
  );
};

export default SearchSongs;
