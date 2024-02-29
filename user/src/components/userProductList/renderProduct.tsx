import React, { useState, useEffect } from "react";
import "./renderProduct.css";
import ProductService from "../../services/product.service";
import { IProduct } from "../../types/interface";
import { toastError, toastSuccess } from "../../utils/toast";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";

interface ProductProps {
  selectedScale: string;
}

const ProductList: React.FC<ProductProps> = ({ selectedScale }) => {
  const idUser: string = localStorage.getItem("idUser") as string;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [getAllProduct, setAllProduct] = useState([]);
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigation("/product/" + id);
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const productService = new ProductService();
  const userService = new UserService();
  useEffect(() => {
    const getProduct = async () => {
      const result = await productService.getAllProduct();
      console.log(result);
      if (selectedScale != "") {
        const productsAfterFilter = result.filter(
          (item: any) => item.scale === selectedScale && item.isDelete === true
        );
        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage;
        const currentProducts = productsAfterFilter.slice(
          firstIndex,
          lastIndex
        );
        setAllProduct(productsAfterFilter);
        setProducts(currentProducts);
      } else {
        const productsAfterFilter = result.filter(
          (item: any) => item.isDelete === true
        );
        const lastIndex = currentPage * productsPerPage;
        const firstIndex = lastIndex - productsPerPage;
        const currentProducts = productsAfterFilter.slice(
          firstIndex,
          lastIndex
        );
        setAllProduct(productsAfterFilter);
        setProducts(currentProducts);
      }
    };
    getProduct();
  }, [currentPage, selectedScale]);

  const handleAddCart = async (idUser: number, itemProduct: IProduct) => {
    if (idUser) {
      if (itemProduct.stock < 1) {
        toastError("Sorry, we out of stock.");
      } else {
        await userService.addToCart(idUser, itemProduct);
        dispatch(update());
        toastSuccess("Adding Successfully !");
      }
    } else {
      toastError("You have to Login first !");
    }
  };
  return (
    <div>
      <ul className="all_product_list">
        {products.map((item: any) => (
          <li key={item.id}>
            <div className="store_product">
              <div className="product_img">
                <img onClick={() => toDetails(item.id)} src={item.img} alt="" />
              </div>
              <h4 onClick={() => toDetails(item.id)}>{item.productName}</h4>
              <p>$ {item.price}</p>
              <button
                className="buyBtn"
                onClick={() => handleAddCart(Number(idUser), item)}
              >
                ADD TO CART
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(getAllProduct.length / productsPerPage) },
          (element, i) => (
            <li key={i + 1} onClick={() => paginate(i + 1)}>
              <button
                className={
                  currentPage === i + 1 ? "btn_active" : "btn_non_active"
                }
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ProductList;
