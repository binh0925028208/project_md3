import React, { useEffect, useState } from "react";
import "./adminOrderDetail.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ICart, IOrder } from "../../types/interface";
import OrderService from "../../services/order.service";
import { formatPrice } from "../../common/formatPrice";
import { useNavigate } from "react-router-dom";
interface Props {
  offOrderDetails: Function;
  orderById: any;
}
const OrderDetail = (props: Props): JSX.Element => {
  let goToDetail = useNavigate();
  const toDetails = (id: number | undefined): void => {
    goToDetail("/product/" + id);
  };
  return (
    <div className="orderDetailOverlay">
      <div className="orderDetail">
        <div className="orderDetailTitle">
          <h2>Order Detail</h2>
          <p style={{ color: "blue" }}>
            Total: $ {props.orderById?.totalPrice}
          </p>
          <AiOutlineCloseCircle
            className="iconClose"
            onClick={() => props.offOrderDetails()}
          />
        </div>
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
            <tbody className="show_order_history">
              {props.orderById?.orderDetails.length > 0 &&
                props.orderById?.orderDetails.map(
                  (item: ICart, index: number) => {
                    return (
                      <tr key={index}>
                        <th
                          className="history_product_img"
                          style={{ marginTop: "30px" }}
                        >
                          <img
                            src={item.img}
                            alt=""
                            width="100px"
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
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
