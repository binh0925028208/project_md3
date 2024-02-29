import { useEffect, useState } from "react";
import "./header.css";
import { CiUser } from "react-icons/ci";
import { PiClockThin } from "react-icons/pi";
import { PiPhoneCallThin } from "react-icons/pi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import UserService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Profile from "../userProfile/profile";
import { logout } from "../../store/reducers/user";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Modal } from "antd";
import ProductService from "../../services/product.service";
import { IProduct } from "../../types/interface";

const Header = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const [char, setChar] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idUser = localStorage.getItem("idUser") as string;
  const userService = new UserService();
  const productService = new ProductService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: any) => state.update);
  const [search, setSearch] = useState<string>("");
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [profile, setProfile] = useState<boolean>(false);
  let goToDetail = useNavigate();
  const toDetails = (id: number | undefined): void => {
    goToDetail("/product/" + id);
    setSearch("");
  };

  useEffect(() => {
    const getUser = async () => {
      if (idUser) {
        const data: any = await userService.getUserById(Number(idUser));
        let fullName: any = data.data.fullName;
        let lastName: string =
          fullName.split(" ")[fullName.split(" ").length - 1];
        let character: string = lastName.charAt(0);
        setCount(data.data.cart.length);
        setChar(character);
      }
    };
    getUser();
  }, [status]);

  const backHome = (): void => {
    navigate("/");
    window.scroll(0, 0);
  };
  const comingSoon = (): void => {
    navigate("/comingsoon");
    window.scroll(0, 0);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    navigate("/", { state: "logout" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const offProfile = (): void => {
    setProfile(false);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value != "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
    }
  };
  // useEffect(() => {
  //   const getProductsSearch = async () => {
  //     const productsSearch = await productService.onSearch(search);
  //     setProductsData(productsSearch);
  //   };
  //   getProductsSearch();
  // }, [search]);
  return (
    <div id="header">
      <section className="header_main_home">
        <div className="header_info">
          <img
            onClick={backHome}
            src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20home%2Fpngfind.com-gundam-head-png-4840508.png?alt=media&token=c316061b-be78-4e2b-a43e-0d5771a6f224"
            className="header_logo"
            alt="gundamShopLogo"
          />
          <div className="header_search">
            <div className="search_bar_box">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search_bar"
                id="search_feature"
                onChange={handleSearch}
                value={search}
              />

              {search.length > 0 ? (
                <ul id="searchList">
                  {productsData.length > 0 ? (
                    productsData.map((item: any) => (
                      <li
                        className="product_search_name"
                        onClick={() => toDetails(item.id)}
                      >
                        {item.productName}
                      </li>
                    ))
                  ) : (
                    <li className="product_search_none">
                      This Product unavailable, please try again!
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
              {/* <button className="search_button">
                <IoMdSearch className="reactIcon" />
              </button> */}
            </div>
          </div>
          <div className="header_contract">
            <div className="header_information">
              <PiClockThin className="reactIcon" />
              <p>08:00 - 17:00</p>
            </div>
            <div className="header_information">
              <PiPhoneCallThin className="reactIcon" />
              <p>0925 028 208</p>
            </div>
          </div>
          {!idUser ? (
            <div className="login-btn">
              <div className="header_user_services">
                <div className="header_border" />
                <Link
                  to={"/login"}
                  className="header_user toolTip"
                  id="user_avatar"
                >
                  <CiUser />
                  <span className="toolTipText" style={{ marginTop: 17 }}>
                    Login Now
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="header_user_services">
              <div className="header_border" />
              <div className="header_cart toolTip">
                <Link to={"/cart"} className="user_cart_box">
                  <PiShoppingCartSimpleLight />
                  {count > 0 ? (
                    <p id="cart_quantity" style={{ visibility: "visible" }}>
                      {count}
                    </p>
                  ) : (
                    <p id="cart_quantity"></p>
                  )}
                </Link>
                <span className="toolTipText">Your cart</span>
              </div>
              <div className="header_user toolTip" id="user_avatar">
                <Link to={"/profile"} className="user_avatar_box">
                  {char}
                </Link>
                <span className="toolTipText" style={{ marginTop: 17 }}>
                  Cart's history
                </span>
              </div>
              <div className="header_user toolTip" id="logout_btn">
                <RiLogoutBoxRLine onClick={showModal} />
                <span className="toolTipText" style={{ marginTop: 17 }}>
                  Logout
                </span>
              </div>
            </div>
          )}
          {profile && <Profile offProfile={offProfile} />}
        </div>
        <div className="header_nav">
          <div className="nav home" onClick={backHome}>
            HOME
          </div>
          <div className="nav" onClick={comingSoon}>
            Introduce
          </div>
          <div className="nav" onClick={comingSoon}>
            How to buy
          </div>
          <div className="nav" onClick={comingSoon}>
            Video
          </div>
          <div className="nav" onClick={comingSoon}>
            Contract
          </div>
          <div className="nav" onClick={comingSoon}>
            News
          </div>
        </div>
        <Modal
          title="Are you sure you want to Log-out ?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modalConfirm"
        />
      </section>
    </div>
  );
};
export default Header;
