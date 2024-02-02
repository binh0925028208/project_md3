import "./productDetail.css";
import { BsInstagram } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { LuFacebook } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "../../types/interface";
import ProductService from "../../services/product.service";
import { formatPrice } from "../../common/formatPrice";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/user.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { toastSuccess } from "../../utils/toast";
import ProductList from "../userProductList/renderProduct";

const ProductDetail: React.FC = (): JSX.Element => {
  const idUser: string = localStorage.getItem("idUser") as string;
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [selectedScale, setSelectedScale] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const userService = new UserService();
  const productService = new ProductService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let param: any = useParams();
  let idProduct: number = param.id;
  useEffect(() => {
    const getProducts = async () => {
      const result: any = await productService.getProductsById(idProduct);
      setProductDetail(result.data);
      setSelectedScale(result.data.scale);
    };
    getProducts();
    window.scroll(0, 0);
  }, [idProduct]);

  const handleAddCartDetail = async (
    productDetail: IProduct | undefined,
    idUser: number,
    quantity: number
  ) => {
    if (idUser) {
      if (Number(productDetail?.stock) < quantity) {
        notifyError("Sorry, we are out of stock.");
      } else {
        await userService.addToCartDetail(productDetail, idUser, quantity);
        dispatch(update());
        toastSuccess("Adding Successfully");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <>
        <section className="prod">
          <div className="prod_main">
            <div className="prod_box1">
              <img src={productDetail?.img} alt="" />
            </div>
            <div className="prod_infor">
              <h2>{productDetail?.productName}</h2>
              <div className="prod_miniborder" />
              <div className="prod_price">
                <p>$ {productDetail?.price}</p>
              </div>
              <div className="prod_infor_detail">
                <p>
                  <strong>Brand:</strong> {productDetail?.brand}
                </p>
                <p>
                  <strong>Made in:</strong> JAPAN
                </p>
                <p>
                  <strong>Scale:</strong> {productDetail?.scaleDetail}
                </p>
                <p>
                  <strong>Stock:</strong> {productDetail?.stock}
                </p>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>{productDetail?.desc}</p>
                <p>You can pre-order</p>
              </div>
              <button
                className="buyBtn"
                onClick={() =>
                  handleAddCartDetail(productDetail, Number(idUser), quantity)
                }
              >
                Add to cart
              </button>
              <div className="prod_miniborder" />
              <div className="pro_tagMenu">
                <a href=""> Gundam/</a>
                <a href="">{productDetail?.scaleDetail}/</a>
              </div>
              <div className="prod_social">
                <BsInstagram className="iconDetailBrand" />
                <SlSocialTwitter className="iconDetailBrand" />
                <LuFacebook className="iconDetailBrand" />
                <FiYoutube className="iconDetailBrand" />
                <LiaTelegramPlane className="iconDetailBrand" />
              </div>
            </div>
          </div>
        </section>
        <div className="border_line" />
        <section className="familiar_prod">
          <div className="familiar_title">
            <h4>{productDetail?.scaleDetail} Products :</h4>
          </div>
          <div className="familiar_product_line" id="storeBody">
            <ProductList selectedScale={selectedScale} />
          </div>
        </section>
      </>
    </div>
  );
};

export default ProductDetail;
