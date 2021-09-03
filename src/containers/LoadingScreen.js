import React from "react";
import TezerionLogo from "../assets/TezerionLogo.svg";

function LoadingScreen() {
  return (
    <div className="align-middle justify-center justify-items-center bg-dark-400 flex h-screen">
      <img
        alt="logo"
        src={TezerionLogo}
        className="animate-pulse w-auto align-middle justify-center m-auto "
      />
    </div>
  );
}

export default LoadingScreen;
