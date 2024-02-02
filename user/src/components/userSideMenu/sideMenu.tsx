import React, { useState } from "react";
import "./sideMenu.css";

interface SideMenuProps {
  setSelectedScale: (scale: string) => void;
}
const SideMenu: React.FC<SideMenuProps> = ({ setSelectedScale }) => {
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (scale: string) => {
    setSelectedScale(scale);
    setActiveButton(scale);
  };
  return (
    <div className="web_sidebar">
      <div className="side_menu">
        <div className="side_menu_head" onClick={() => handleButtonClick("")}>
          <p>OUR GUNDAM PRODUCTS</p>
        </div>
        <button
          onClick={() => handleButtonClick("mg")}
          className={`sideIndex ${activeButton === "mg" ? "active" : ""}`}
        >
          MG 1/100
        </button>
        <button
          onClick={() => handleButtonClick("pg")}
          className={`sideIndex ${activeButton === "pg" ? "active" : ""}`}
        >
          PG 1/60
        </button>
        <button
          onClick={() => handleButtonClick("hg")}
          className={`sideIndex ${activeButton === "hg" ? "active" : ""}`}
        >
          HG 1/144
        </button>
        <button
          onClick={() => handleButtonClick("rg")}
          className={`sideIndex ${activeButton === "rg" ? "active" : ""}`}
        >
          RG 1/144
        </button>
        <button
          onClick={() => handleButtonClick("mb")}
          className={`sideIndex ${activeButton === "mb" ? "active" : ""}`}
        >
          METAL-BUILD
        </button>
        <button
          onClick={() => handleButtonClick("ms")}
          className={`sideIndex ${activeButton === "ms" ? "active" : ""}`}
        >
          MEGA-SIZE
        </button>
        <button
          onClick={() => handleButtonClick("rs")}
          className={`sideIndex ${activeButton === "rs" ? "active" : ""}`}
        >
          ROBOT-SPIRITS
        </button>
        <button
          onClick={() => handleButtonClick("hr")}
          className={`sideIndex ${activeButton === "hr" ? "active" : ""}`}
        >
          HI-RES
        </button>
        <button
          onClick={() => handleButtonClick("sd")}
          className={`sideIndex ${activeButton === "sd" ? "active" : ""}`}
        >
          SD
        </button>
      </div>
      <div className="side_menu2">
        <div className="side_menu_head2">
          <p>OUR TERM</p>
        </div>
        <div className="side_menu_term_infor">
          <div className="side_menu_term_logo">
            <img src="./Assets/img/badge-600x600.jpg" alt="" />
          </div>
          <div className="side_menu_term_text">
            <h2>COPYRIGHT</h2>
            <p>100% Official</p>
          </div>
        </div>
        <div className="side_menu_term_infor">
          <div className="side_menu_term_logo">
            <img
              src="./Assets/img/Papirus-Team-Papirus-Apps-System-software-update-800x800.jpg"
              alt=""
            />
          </div>
          <div className="side_menu_term_text">
            <h2>UPDATE</h2>
            <p>Update daily</p>
          </div>
        </div>
        <div className="side_menu_term_infor">
          <div className="side_menu_term_logo">
            <img src="./Assets/img/Thanhtoan.jpg" alt="" />
          </div>
          <div className="side_menu_term_text">
            <h2>PAY CARD</h2>
            <p>100% Sercurity</p>
          </div>
        </div>
        <div className="side_menu_term_infor">
          <div className="side_menu_term_logo">
            <img src="./Assets/img/muahang.jpg" alt="" />
          </div>
          <div className="side_menu_term_text">
            <h2>BUYING</h2>
            <p>Easily access</p>
          </div>
        </div>
        <div className="side_menu_term_infor">
          <div className="side_menu_term_logo">
            <img src="./Assets/img/vanchuyen.png" alt="" />
          </div>
          <div className="side_menu_term_text">
            <h2>SHIPPING</h2>
            <p>Fast and safe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
