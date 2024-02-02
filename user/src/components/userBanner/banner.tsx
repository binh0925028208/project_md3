import React, { Component } from "react";
import Slider from "react-slick";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import storage from "../../config/firebase";
import { Carousel } from "antd";
import "./banner.css";
import { useNavigate } from "react-router-dom";
const contentStyle: React.CSSProperties = {
  height: "100%",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  objectFit: "cover",
};

const Banner: React.FC = () => {
  let gotoLogin = useNavigate();
  const toLogin = (): void => {
    gotoLogin("/Login");
  };
  return (
    <div className="banner_home">
      <Carousel autoplay style={{ width: "70%" }}>
        <div className="slide_of_banner">
          <figure style={contentStyle}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20banner%2Fbanner_01.jpg?alt=media&token=466544ed-0cbd-4ed4-ba47-31e63d6f514e"
              alt=""
            />
          </figure>
        </div>
        <div className="slide_of_banner">
          <figure style={contentStyle}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20banner%2Fbanner_02.jpg?alt=media&token=156c7812-5799-470b-aa81-482b9a1ca7a6"
              alt=""
            />
          </figure>
        </div>
        <div className="slide_of_banner">
          <figure style={contentStyle}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20banner%2F33423.jpg?alt=media&token=a7291bdb-e149-436b-a322-bc6e047d3c93"
              alt=""
              style={contentStyle}
            />
          </figure>
        </div>
        <div className="slide_of_banner">
          <figure style={contentStyle}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20banner%2Fgbwc%202015%20philippines%20janmikel%20ong%20(1).jpg?alt=media&token=57db5c54-a6a0-4aaa-96ea-4c1246fdd086"
              alt=""
            />
          </figure>
        </div>
      </Carousel>
      <div className="freeShip_banner">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20banner%2Fbanner.png?alt=media&token=693f6944-624e-4107-87cd-f1887c3d62db"
          alt=""
          onClick={toLogin}
        />
      </div>
    </div>
  );
};

export default Banner;
