import "./footer.css";
import { CiTwitter } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { PiClockThin } from "react-icons/pi";
import { PiPhoneCallThin } from "react-icons/pi";
const Footer = () => {
  return (
    <div id="footer">
      <div className="footer_main">
        <div className="footer_box">
          <div className="footer_box_title">
            <h3>GUNDAM UNIVERSE</h3>
          </div>
          <div className="footer_box_infor">
            <p style={{ color: "white" }}>
              Providing best quality of service and product, stay true to vision
              and loyal to customer.
            </p>
            <div className="header_information">
              <PiClockThin />
              <p style={{ color: "white" }}>08:00 - 17:00</p>
            </div>
            <div className="header_information">
              <PiPhoneCallThin />
              <p style={{ color: "white" }}>0925 028 208</p>
            </div>
          </div>
        </div>
        <div className="footer_box">
          <div className="footer_box_title">
            <h3>CUSTOMER SERVICES</h3>
          </div>
          <div className="footer_box_infor">
            <h5>Introduction</h5>
            <h5>Contract</h5>
            <h5>Wholesale policy</h5>
            <h5>How to buy</h5>
          </div>
        </div>
        <div className="footer_box">
          <div className="footer_box_title">
            <h3>OUR POLICIESS</h3>
          </div>
          <div className="footer_box_infor">
            <h5>Warranty Policy</h5>
            <h5>Privacy Policy</h5>
            <h5>Shipping Policy</h5>
            <h5>Payment Policy</h5>
          </div>
        </div>
        <div className="footer_box">
          <div className="footer_box_infor">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24171.028111594955!2d-74.061972!3d40.775692!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2577113d0547b%3A0xbee430e9e50dd3e9!2sNJ%20Motor%20Vehicle%20Commission%20Vehicle%20Inspection%20Station!5e0!3m2!1svi!2sus!4v1698917362055!5m2!1svi!2sus"
              width={600}
              height={450}
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>Copyright 2023 © Gundam Universe</p>
        <div className="footer_bottom_social">
          <p>Follow Us</p>
          <CiFacebook />
          <CiInstagram />
          <CiTwitter />
          <CiYoutube />
        </div>
      </div>
    </div>
  );
};

export default Footer;
