import "./app.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layout/adminLayout/adminLayout";
import AdminDashboard from "./components/adminDashboard/adminDashboard";
import ComingSoon from "./components/comingSoon/commingSoon";
import AdminLogin from "./layout/adminLoginLayout/adminLogin";
import AdminUserPage from "./components/adminUserPage/adminUserPage";
import AdminOrders from "./components/adminOrdersPage/adminOrderPage";
import AdminProducts from "./components/adminProductsPage/adminProductsPage";
import P404Layout from "./layout/error/404Layout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout child={<AdminDashboard />} />} />
        <Route
          path="/adminUsers"
          element={<AdminLayout child={<AdminUserPage />} />}
        />
        <Route
          path="/adminOrders"
          element={<AdminLayout child={<AdminOrders />} />}
        />
        <Route
          path="/adminProducts"
          element={<AdminLayout child={<AdminProducts />} />}
        />

        <Route path="/*" element={<P404Layout />} />
      </Routes>
    </div>
  );
}

export default App;
