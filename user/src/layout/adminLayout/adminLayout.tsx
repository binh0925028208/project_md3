import React from "react";
import "./adminLayout.css";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AdminHeader from "../../components/adminHeader/adminHeader";
import AdminDashboard from "../../components/adminDashboard/adminDashboard";

interface Props {
  child: JSX.Element;
}

export default function AdminLayout(props: Props) {
  return (
    <div className="wrapper_adminLayout">
      <div className="wrapper_adminLayout_sidebar">
        <AdminSidebar />
      </div>
      <div className="wrapper_adminLayout_body">
        <AdminHeader />
        <div className="content_adminLayout">
          <div>{props.child}</div>
        </div>
      </div>
    </div>
  );
}
