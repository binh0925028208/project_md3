import { useEffect, useState } from "react";
import "./adminHeader.css";
import { CiUser } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { PiClockThin } from "react-icons/pi";
import { PiPhoneCallThin } from "react-icons/pi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import UserService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Profile from "../profile/profile";
import { logout } from "../../store/reducers/user";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Modal } from "antd";
import ProductService from "../../services/product.service";
import { IProduct } from "../../types/interface";
import { toastError } from "../../utils/toast";

const Header = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const [char, setChar] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idUser = localStorage.getItem("idUser") as string;
  const userService = new UserService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: any) => state.update);
  const [profile, setProfile] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      if (idUser) {
        const data: any = await userService.getUserById(Number(idUser));
        const roleUser = data.data.role;
        if (roleUser === 1) {
          navigate("/adminLogin");
          toastError("Please Login first to access.");
        }
        let fullName: any = data.data.fullName;
        let lastName: string =
          fullName.split(" ")[fullName.split(" ").length - 1];
        let character: string = lastName.charAt(0);
        setCount(data.data.cart.length);
        setChar(character);
      } else {
        navigate("/adminLogin");
        toastError("Please Login first to access.");
      }
    };
    getUser();
  }, [status]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    navigate("/adminLogin", { state: "logout" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const offProfile = (): void => {
    setProfile(false);
  };

  return (
    <>
      <div className="admin_head">
        <div className="header_search">
          {/* <div className="search_bar_box">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="admin_search_input"
            />
            <a href="#mini_search" className="admin_search_button">
              <IoMdSearch className="reactIcon" />
            </a>
          </div> */}
        </div>
        <div className="header_user_services">
          <div className="header_border" />
          <div className="user_avatar_box">{char}</div>
          <div className="header_user toolTip" id="logout_btn">
            <RiLogoutBoxRLine onClick={showModal} />
            <span className="toolTipText" style={{ marginTop: 17 }}>
              Logout
            </span>
          </div>
        </div>
        {profile && <Profile offProfile={offProfile} />}
      </div>
      <Modal
        title="Are you sure you want to Log-out ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modalConfirm"
      />
    </>
  );
};
export default Header;
