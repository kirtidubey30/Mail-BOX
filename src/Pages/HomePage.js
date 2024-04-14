import React from "react";
import Header from "../components/layout/Header";
import backgroundImage from "../../src/assets/MailBoxBgImg.png";
function HomePage() {
  return (
    <>
      <Header />
      <div
        className="absolute bg-center bg-cover inset-0 left-17rem z-0 slide-down"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "white",
        }}
      />
    </>
  );
}

export default HomePage;
