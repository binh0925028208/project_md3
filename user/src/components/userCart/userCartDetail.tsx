import "./userCartDetail.css";
import { useEffect, useState, MouseEvent, useRef, useMemo } from "react";
import { ICart, IOrder } from "../../types/interface";
import UserService from "../../services/user.service";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import { toastError, toastSuccess } from "../../utils/toast";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import PaypalComponent from "../userPaypal/paypal";
import OrderService from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/product.service";

const UserCartDetail = () => {
  const idUser = localStorage.getItem("idUser") as any;
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productService = new ProductService();
  const userService = new UserService();
  const orderService = new OrderService();
  const status = useSelector((state: any) => state.update);
  const itemDelete = useRef<any>();
  const idUserDelete = useRef<any>();
  const [paymentState, setPaymentState] = useState("");
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigation("/product/" + id);
  };

  useEffect(() => {
    const getUser: any = async () => {
      let user: any = await userService.getUserById(Number(idUser));
      setCartItems(user.data.cart);
    };
    getUser();
    window.scroll(0, 0);
  }, [status]);

  // thêm giảm xóa quantity-----------
  const handlePlus = async (item: ICart, idUser: number) => {
    if (item.quantity >= item.stock) {
      toastError("Sorry, we out of stock");
    } else {
      await userService.onPlus(item, idUser);
      dispatch(update());
    }
  };

  const handleMinus = async (item: ICart, idUser: number) => {
    if (item.quantity <= 1) {
      toastError("The minium number of products must be 1");
    } else {
      await userService.onMinus(item, idUser);
      dispatch(update());
    }
  };

  const handleDelete = async (item: ICart, idUser: number) => {
    itemDelete.current = item;
    idUserDelete.current = idUser;
    showDeleteModal();
  };

  const showDeleteModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await userService.onDelete(itemDelete.current, idUserDelete.current);
    dispatch(update());
    toastSuccess("Delete product Successful");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //------------------------------

  //date và total price
  let date = useMemo(() => {
    let dateNow = new Date();
    return (
      dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear()
    );
  }, []);

  let totalPrice = useMemo(() => {
    let result = 0;
    cartItems.forEach((item: ICart) => {
      result += item.price * item.quantity;
    });
    return result;
  }, [cartItems]);
  //-------------------------------

  const handleChangeFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [formData, setFormData] = useState<IOrder>({
    address: "",
    phone: "",
    idUser: idUser,
    userName: "",
    status: 1,
    date: date,
    orderDetails: [],
  });

  useEffect(() => {
    const getCart = async () => {
      const data: any = await userService.getUserById(Number(idUser));
      if (data && data.data && data.data.cart) {
        let carts: ICart[] = data.data.cart;
        setFormData({
          ...formData,
          orderDetails: carts,
        });
      }
    };
    getCart();
  }, [idUser]);

  const handlePayment = async (formData: IOrder) => {
    if (formData.address.length != 0) {
      if (
        formData.address.length < 10 &&
        formData.phone.length < 9 &&
        formData.userName.length < 3
      ) {
        toastError("Please write your information carefully, thank you.");
      } else {
        const form = {
          ...formData,
          totalPrice: totalPrice,
        };
        await orderService.postOrder(form);
        await userService.removeCarts(Number(idUser));
        formData.orderDetails === undefined
          ? toastError("orderDetails is undefined")
          : await productService.onMinusStock(formData.orderDetails);
        toastSuccess("Thank you, your order is on the way.");
        navigation("/profile");
        dispatch(update());
      }
    }
  };
  useEffect(() => {
    handlePayment(formData);
  }, [paymentState]);
  return (
    <div>
      <section className="cart">
        <div className="cart_product">
          <table className="cart_product_head">
            {cartItems.length === 0 ? (
              ""
            ) : (
              <thead>
                <tr>
                  <th>
                    <h4>PRODUCT</h4>
                  </th>
                  <th>
                    <h4>NAME</h4>
                  </th>
                  <th>
                    <h4>QUANTITY</h4>
                  </th>
                  <th>
                    <h4>PRICE</h4>
                  </th>
                </tr>
              </thead>
            )}
            <tbody className="cart_product_body">
              {cartItems.length === 0 ? (
                <img
                  src="../../Assets/img/empty_cart.png"
                  alt=""
                  id="emptyImg"
                />
              ) : (
                cartItems.map((item: ICart) => {
                  return (
                    <tr className="cart_prod">
                      <td className="cart_prod_img">
                        <img
                          src={item.img}
                          alt=""
                          onClick={() => toDetails(item.id)}
                        />
                      </td>
                      <td className="cart_prod_name">
                        <p onClick={() => toDetails(item.id)}>
                          {item.productName}
                        </p>
                      </td>
                      <td className="cart_prod_quantity">
                        <div className="cart_quantity_box">
                          <button
                            onClick={() => handleMinus(item, Number(idUser))}
                          >
                            <IoIosArrowBack />
                          </button>
                          <div id="quantityNumber">{item.quantity}</div>
                          <button
                            onClick={() => handlePlus(item, Number(idUser))}
                          >
                            <IoIosArrowForward />
                          </button>
                        </div>
                      </td>
                      <td className="cart_prod_totalPrice">
                        <p>$ {item.price * item.quantity}</p>
                      </td>
                      <td>
                        <button
                          className="deleteProduct"
                          onClick={() => handleDelete(item, Number(idUser))}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="cart_checkout">
          <h4>CHECKOUT INFORMATION</h4>
          <div className="checkout_body">
            <div className="user_box">
              <div className="total_price_box">
                <p>Your Total:</p>
                <p
                  id="total_price_of_products"
                  style={{ color: "rgb(23, 101, 236)" }}
                >
                  $ {totalPrice}
                </p>
              </div>
            </div>
            <div className="user_box">
              <input
                type="text"
                id="user_fullName"
                name="userName"
                value={formData.userName}
                placeholder="Your first-Last name..."
                onChange={handleChangeFormData}
              />
            </div>
            <div className="user_box">
              <input
                type="text"
                name="address"
                id="user_address"
                placeholder="Your address..."
                value={formData.address}
                minLength={10}
                onChange={handleChangeFormData}
              />
            </div>
            <div className="user_box">
              <input
                type="text"
                id="user_phone"
                name="phone"
                value={formData.phone}
                placeholder="Your phone-number..."
                onChange={handleChangeFormData}
              />
            </div>
            <div className="user_box">
              <div className="phone_input"></div>
            </div>
            <button
              className="wayToPay cod"
              onClick={() => handlePayment(formData)}
            >
              COD
            </button>
            <div className="paypal_btn">
              <PaypalComponent
                amount={totalPrice}
                setPaymentState={setPaymentState}
              />
            </div>
          </div>
        </div>
      </section>
      <Modal
        title="Are you sure you want to delete this product ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modalConfirm"
      />
    </div>
  );
};

export default UserCartDetail;
