import React, { useEffect, useState } from "react";
import "./adminDashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";
import OrderService from "../../services/order.service";
import { IOrder, IProduct, IUser } from "../../types/interface";
import { useSelector } from "react-redux";
import AdminService from "../../services/admin.service";
import { toastError, toastSuccess } from "../../utils/toast";
import { FaRegCalendarCheck, FaUserFriends } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import PieActiveArc from "../pieChart/pieChart";

const Dashboard = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [admin, setAdmin] = useState<IUser>();
  const idAdmin = localStorage.getItem("idAdmin");
  const status = useSelector((state: any) => state.update);
  const userService = new UserService();
  const productService = new ProductService();
  const orderService = new OrderService();
  const adminService = new AdminService();
  let location: any = useLocation();
  let navigate = useNavigate();
  const goToLoginAdmin = () => {
    navigate("/adminLogin");
  };
  const goAdminUsers = () => {
    navigate("/adminUsers");
  };
  const goAdminProducts = () => {
    navigate("/adminProducts");
  };
  const goAdminOrders = () => {
    navigate("/adminOrders");
  };
  useEffect(() => {
    if (location.state?.role === 1) {
      toastError("Please Login first");
      goToLoginAdmin();
    }
    // if (location.state?.role === 3) {
    //   notifySuccess(`Welcome Admin ${location.state.fullName}`);
    // }
    if (location.state?.role === 2) {
      toastSuccess(`Welcome Moderator ${location.state.fullName}`);
    }
  }, []);
  useEffect(() => {
    const getValue = async () => {
      const user = await adminService.getAllAdmin();
      const product = await productService.getAllProduct();
      const order = await orderService.getAllOrders();
      const admin = await adminService.getAdminById(Number(idAdmin));
      setUsers(user);
      setProducts(product);
      setOrders(order);
      setAdmin(admin);
    };
    getValue();
  }, [status]);
  return (
    <section className="dashboard">
      <div className="admin_display_detail">
        <div className="admin_button">
          <div className="admin_box_1" onClick={goAdminOrders}>
            <div className="admin_box_detail">
              <h3>Orders</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p>{orders.length}</p>
              </div>
            </div>
            <div className="admin_box_icon">
              <FaRegCalendarCheck />
            </div>
          </div>
          <div className="admin_box_2" onClick={goAdminUsers}>
            <div className="admin_box_detail">
              <h3>Users</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p>{users.length}</p>
              </div>
            </div>
            <div className="admin_box_icon">
              <FaUserFriends />
            </div>
          </div>
          <div className="admin_box_3" onClick={goAdminProducts}>
            <div className="admin_box_detail">
              <h3>Products</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p>{products.length}</p>
              </div>
            </div>
            <div className="admin_box_icon">
              <FaBoxesPacking />
            </div>
          </div>
        </div>
        {/* <div className="admin_button">
          <div className="admin_box_4">
            <div className="admin_box_detail">
              <h3>Revenue</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p id="totalRevenue" />
              </div>
            </div>
            <div className="admin_box_icon">
              <i className="fa-solid fa-sack-dollar" />
            </div>
          </div>
          <div className="admin_box_5">
            <div className="admin_box_detail">
              <h3>Stock</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p>{products.length}</p>
              </div>
            </div>
            <div className="admin_box_icon">
              <i className="fa-solid fa-boxes-stacked" />
            </div>
          </div> 
           <div className="admin_box_6">
            <div className="admin_box_detail">
              <h3>Out-stock:</h3>
              <div className="admin_mini_box_infor">
                <p>Total :</p>
                <p id="totalOutStocks" />
              </div>
            </div>
            <div className="admin_box_icon">
              <i className="fa-solid fa-dolly" />
            </div>
          </div>
        </div> */}
      </div>
      <div className="pieChart">
        <h2>Product's scale quantity:</h2>
        <PieActiveArc />
      </div>
    </section>
  );
};

export default Dashboard;
