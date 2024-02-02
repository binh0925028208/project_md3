import { Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./adminAdd.css";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../common/toastify";
import { IProduct } from "../../types/interface";
import ProductService from "../../services/product.service";
import UploadService from "../../services/uploadImg.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { toastError } from "../../utils/toast";
interface Props {
  offModalAdd: Function;
}
const ModalAddProducts = (props: Props) => {
  const [images, setImages] = useState<any>();
  const [file, setFile] = useState<any>();
  const [newProduct, setNewProduct] = useState<IProduct>({
    productName: "",
    price: 1,
    stock: 1,
    isDelete: true,
    img: "https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Nodata%2Fupload-image-icon.webp?alt=media&token=60b8bf2e-4b47-4079-b9e6-6974347e337c",
    desc: "",
    scale: "",
    brand: "",
    scaleDetail: "",
  });

  const handleAvatar = (e: any) => {
    try {
      let file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setFile(file);
      setImages(file);
    } catch (error: any) {
      notifyError(error.response.data);
    }
  };
  useEffect(() => {
    return images && URL.revokeObjectURL(images.preview);
  }, [images]);

  //   Validate Blur
  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    const spanElements = e.target.parentElement?.querySelector(
      ".ruleBlur"
    ) as HTMLSpanElement;
    if (e.target.value === "" || e.target.value === "0") {
      e.target.style.border = "1px solid red";
      spanElements.innerText = "Enter this field*";
    } else {
      e.target.style.border = "1px solid #000";
      spanElements.innerText = "";
    }
  };

  //   Get value new product
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 0) {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setNewProduct({
        ...newProduct,
        scale: e.target.value,
      });
    }
  };

  //  Validate rule and request API
  const dispatch = useDispatch();
  const handleAddNewProduct = async () => {
    if (
      newProduct.productName === "" ||
      newProduct.desc === "" ||
      newProduct.scale === "" ||
      newProduct.price === 1 ||
      newProduct.stock === 1
    ) {
      toastError("Please enter all field");
    } else {
      try {
        const productService = new ProductService();
        const uploadService = new UploadService();
        if (file) {
          const url = await uploadService.uploadImage(
            file,
            `Products/${newProduct.scale}`
          );
          let result = {
            ...newProduct,
            image: url,
          };
          await productService.addProduct(result);
        } else {
          notifyError("Your image is not valid");
        }
        dispatch(update());
        props.offModalAdd();
        notifySuccess("Added product successfully");
      } catch (error: any) {
        toastError(error);
      }
    }
  };
  return (
    <div className="modalAddProductsOverlay">
      <div className="modalAddProducts">
        <div className="modalAddProductsImg">
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input
              onChange={handleAvatar}
              style={{ display: "none" }}
              type="file"
              name=""
              id="photo"
            />
          </div>
        </div>
        <div className="modalAddProductsInputs">
          <div className="modalAddProductsInput">
            <input
              onChange={handleChangeInput}
              value={newProduct.productName}
              onBlur={handleBlurInput}
              placeholder="Name Product"
              type="text"
              name="productName"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <input
              onChange={handleChangeInput}
              value={newProduct.desc}
              onBlur={handleBlurInput}
              placeholder="Describe"
              type="text"
              name="desc"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Price</p>
            <input
              onChange={handleChangeInput}
              value={newProduct.price}
              onBlur={handleBlurInput}
              placeholder="Price"
              type="text"
              name="price"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <p>Stock</p>
            <input
              onChange={handleChangeInput}
              value={newProduct.stock}
              onBlur={handleBlurInput}
              placeholder="Stock"
              type="text"
              name="stock"
              id=""
            />
            <span className="ruleBlur"></span>
          </div>
          <div className="modalAddProductsInput">
            <select onChange={handleChangeSelect} name="" id="">
              <option value="">Scale</option>
              <option value="mg">MASTER GRADE</option>
              <option value="rg">REAL GRADE</option>
              <option value="hg">HIGH GRADE</option>
              <option value="hg">HIGH GRADE</option>
              <option value="pg">PERFECT GRADE</option>
              <option value="mb">METAL BUILD</option>
              <option value="ms">MEGA SIZE</option>
              <option value="rs">ROBOT SPIRIT</option>
              <option value="sd">SUPER DEFORMED</option>
              <option value="hr">HIGH-RESOLUTION</option>
            </select>
          </div>
        </div>
        <div className="modalAddProductsActions">
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={handleAddNewProduct}
            okText="Yes"
            cancelText="No"
          >
            <button>ADD+</button>
          </Popconfirm>
          <button onClick={() => props.offModalAdd()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalAddProducts;
