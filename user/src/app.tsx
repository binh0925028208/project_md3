import "./app.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./layout/defaultLayout/defaultLayout";
import HomeMain from "./components/userHome/homeMain";
import ProductDetail from "./components/userProductDetail/productDetail";
import UserCartDetail from "./components/userCart/userCartDetail";
import LoginLayout from "./layout/loginLayout/loginLayout";
import ComingSoon from "./components/comingSoon/comingSoon";
import UserHistory from "./components/userCartHistory/cartHistory";
import P404Layout from "./layout/error/404Layout";
function App() {
  
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DefaultLayout child={<HomeMain />} />} />
        <Route
          path="/comingSoon"
          element={<DefaultLayout child={<ComingSoon />} />}
        />
        <Route
          path="/product/:id"
          element={<DefaultLayout child={<ProductDetail />} />}
        />
        <Route path="/login" element={<LoginLayout />} />
        <Route
          path="/cart"
          element={<DefaultLayout child={<UserCartDetail />} />}
        />
        <Route
          path="/profile"
          element={<DefaultLayout child={<UserHistory />} />}
        />

        <Route path="/*" element={<P404Layout />} />
      </Routes>
    </div>
  );
}

export default App;
