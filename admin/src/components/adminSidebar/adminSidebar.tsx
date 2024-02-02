import React, { useState } from "react";
import "./adminSidebar.css";
import { BsFillBarChartFill, BsFillBox2Fill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (state: string) => {
    setActiveButton(state);
    navigate(`/${state}`);
  };

  return (
    <div className="admin_sidebar">
      <div className="admin_logo">
        {/* <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20admin%2Flogo.png?alt=media&token=e06c6c8c-d970-4e7f-9404-7113d5c204fb"
          alt=""
        /> */}
      </div>
      <div className="admin_category">
        <button
          onClick={() => handleButtonClick("adminPage")}
          className={`side_admin_index ${
            activeButton === "adminPage" ? "active" : ""
          }`}
        >
          <BsFillBarChartFill /> Dashboard
        </button>
        <button
          onClick={() => handleButtonClick("adminUsers")}
          className={`side_admin_index ${
            activeButton === "adminUsers" ? "active" : ""
          }`}
        >
          <IoPeopleSharp /> Users
        </button>
        <button
          onClick={() => handleButtonClick("adminProducts")}
          className={`side_admin_index ${
            activeButton === "adminProducts" ? "active" : ""
          }`}
        >
          <BsFillBox2Fill /> Products
        </button>
        <button
          onClick={() => handleButtonClick("adminOrders")}
          className={`side_admin_index ${
            activeButton === "adminOrders" ? "active" : ""
          }`}
        >
          <LuClipboardEdit /> Orders
        </button>
      </div>
    </div>
  );
};
export default AdminSidebar;
