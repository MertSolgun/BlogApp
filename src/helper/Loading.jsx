import React from "react";

import { ProgressBar } from "react-loader-spinner";
const Loading = () => {
  return (
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        height: "50vh",
      }}
      wrapperClass=""
    />
  );
};

export default Loading;
