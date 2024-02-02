import "./cartHistory.css";
import { useEffect, useState } from "react";
import OrderService from "../../services/order.service";
import { ICart, IOrder, IOrderDetail } from "../../types/interface";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../utils/toast";

const UserHistory = (): JSX.Element => {
  const idUser = localStorage.getItem("idUser");
  const [ordersHistory, setOrdersHistory] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder[]>([]);
  const orderService = new OrderService();
  const [showProducts, setShowProducts] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigate("/product/" + id);
  };

  useEffect(() => {
    const getOrder = async () => {
      const data: any = await orderService.getOrder(Number(idUser));
      console.log(data);
      if (data.length === 0) {
        toastError("you didn't buy any products before!");
        navigate("/");
      } else {
        setOrdersHistory(data.orderDetails);
        setOrder(data);
      }
    };
    window.scroll(0, 0);
    getOrder();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowProduct = (orderId: number) => {
    const orderAfterFind = order.find((order) => order.id === orderId);
    if (orderAfterFind) {
      setOrdersHistory([orderAfterFind]);
      setShowProducts(2);
      showModal();
    }
  };
  return (
    <div>
      <section className="historyCart">
        <div className="history_cart_body">
          <table className="history_cart_box">
            <thead>
              <tr className="history_box_head">
                <th className="h_id">
                  <span>STT</span>
                </th>
                <th className="h_cart">
                  <span>CART</span>
                </th>
                <th className="h_price">
                  <span>TOTAL PRICES</span>
                </th>
                <th className="h_ship">
                  <span>SHIPPING</span>
                </th>
                <th className="h_date">
                  <span>DATE</span>
                </th>
                {/* <th className="h_delete">
                  <span>OPTION</span>
                </th> */}
              </tr>
            </thead>
            <tbody id="history_of_user">
              {order.length === 0 ? (
                <img
                  src="../../Assets/img/empty_cart.png"
                  alt=""
                  className="empty_cart_img"
                />
              ) : (
                order.map((item: any, index: number) => {
                  switch (item.status) {
                    case 2:
                      item.status = "Shipping...";
                      break;
                    case 3:
                      item.status = "Completed.";
                      break;
                    default:
                      item.status = "Working on...";
                      break;
                  }
                  return (
                    <tr className="history_box_data" key={index}>
                      <th className="h_id" id="history_stt">
                        <span>{index++}</span>
                      </th>
                      <th className="h_cart">
                        <button onClick={() => handleShowProduct(item.id)}>
                          Show products
                        </button>
                      </th>
                      <th className="h_price" id="history_price">
                        <span>$ {item.totalPrice}</span>
                      </th>
                      <th className="h_ship">
                        <span id="yourShip">{item.status}</span>
                      </th>
                      <th className="h_date" id="history_date">
                        <span>{item.date}</span>
                      </th>
                      <th className="h_delete">
                        <button></button>
                      </th>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div>
          {showProducts === 2 ? (
            <Modal
              className="modal_show_up"
              title="Your history purchase :"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="history_cart_product_box">
                <table className="history_cart_box">
                  <thead>
                    <tr className="history_product_head">
                      <th className="show_img">
                        <span>IMAGE</span>
                      </th>
                      <th className="show_name">
                        <span>PRODUCT</span>
                      </th>
                      <th className="show_quantity">
                        <span>QUANTITY</span>
                      </th>
                      <th className="show_price">
                        <span>PRICE</span>
                      </th>
                    </tr>
                  </thead>
                  {ordersHistory.map((order: IOrder, index: number) =>
                    order.orderDetails?.map((item: ICart, index: number) => (
                      <tbody>
                        <tr id={`showUpCartInfor_list_${index}`} key={index}>
                          <th className="history_product_img">
                            <img
                              src={item.img}
                              alt=""
                              width="50px"
                              onClick={() => toDetails(item.id)}
                            />
                          </th>
                          <th className="history_product_name">
                            <span onClick={() => toDetails(item.id)}>
                              {item.productName}
                            </span>
                          </th>
                          <th>
                            <span>{item.quantity}</span>
                          </th>
                          <th>
                            <span
                              style={{
                                color: "rgb(11, 98, 238)",
                              }}
                            >
                              $ {item.quantity * item.price}
                            </span>
                          </th>
                        </tr>
                      </tbody>
                    ))
                  )}
                </table>
              </div>
            </Modal>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default UserHistory;
