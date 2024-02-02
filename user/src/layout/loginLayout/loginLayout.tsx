import { useState } from "react";
import "./loginLayout.css";
import Login from "../../components/userLogin/login";
import Register from "../../components/userRegister/register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function LoginLayout() {
  const [showLogin, setShowLogin] = useState(true);

  const toShowRegister = () => {
    setShowLogin(false);
  };
  const toShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="login_page">
      <ToastContainer />
      <div className="login_background">
        <div className="login_box">
          {showLogin ? (
            <Login btnRegister={toShowRegister} />
          ) : (
            <Register btnLogin={toShowLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
