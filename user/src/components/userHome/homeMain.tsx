import React, { useEffect, useState } from "react";
import Banner from "../userBanner/banner";
import SideMenu from "../userSideMenu/sideMenu";
import "./homeMain.css";
import FacebookComment from "../facebookComment/fbComment";
import ProductList from "../userProductList/renderProduct";
import { TbPhoneCall } from "react-icons/tb";
import { FaMedal } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";

const HomeMain = () => {
  const [selectedScale, setSelectedScale] = useState("");
  return (
    <main className="web_main">
      <section className="banner-section">
        <Banner />
        <div className="banner_infor">
          <div className="banner_infor_box">
            <div className="banner_infor_logo">
              <TbPhoneCall />
            </div>
            <div className="banner_infor_text">
              <h2>0123 333 333</h2>
              <p>HOTLINE 24/7</p>
            </div>
          </div>
          <div className="banner_infor_box">
            <div className="banner_infor_logo">
              <FaMedal />
            </div>
            <div className="banner_infor_text">
              <h2>100% OFFICIAL</h2>
              <p>Guaranteed no fake</p>
            </div>
          </div>
          <div className="banner_infor_box">
            <div className="banner_infor_logo">
              <LiaShippingFastSolid />
            </div>
            <div className="banner_infor_text">
              <h2>SHIP WHOLE COUNTRY</h2>
              <p>Freeship around 10km</p>
            </div>
          </div>
        </div>
      </section>
      <section className="web_body">
        <SideMenu setSelectedScale={setSelectedScale} />
        <div className="store">
          {/* <div className="store_title_after_search">
            <h1 id="title_product" />
            <div className="sort_button" id="showSortBtn"></div>
          </div> */}
          <div className="store_sort">
            <div className="store_new">
              <div className="store_title">
                <i
                  className="fa-solid fa-arrow-down"
                  style={{ color: "red" }}
                />
                <h2>Our products :</h2>
              </div>
              <div className="store_product_list">
                <ProductList selectedScale={selectedScale} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeMain;
