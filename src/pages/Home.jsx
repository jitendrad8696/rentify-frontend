import React from "react";
import { useSelector } from "react-redux";
import PostProperty from "./PostProperty";
import FilterProperties from "./FilterProperties";

function Home() {
  const userInfo = useSelector((state) => state.user.user);

  return (
    <div>
      {userInfo.userType === "seller" ? <PostProperty /> : <FilterProperties />}
    </div>
  );
}

export default Home;
