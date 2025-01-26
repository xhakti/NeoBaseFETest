import React from "react";
import ConnectBtn from "./ConnectBtn";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <ConnectBtn />
    </div>
  );
};

export default Header;
