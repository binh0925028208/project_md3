import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./adminUpdate.css";
import { IProduct } from "../../types/interface";
import { MdAddPhotoAlternate } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/product.service";
import UploadService from "../../services/uploadImg.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import { toastError, toastSuccess } from "../../utils/toast";
interface Props {
  offModalEdit: Function;
  dataEdit: any;
}
const AdminUpdateProducts = (props: Props): JSX.Element => {
  const [updateData, setUpdateData] = useState<IProduct>(props.dataEdit);
  const [images, setImages] = useState<any>();
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
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

  const handleUpdateProducts = async (id: number) => {
    try {
      const productService = new ProductService();
      const uploadService = new UploadService();
      if (file) {
        const url = await uploadService.uploadImage(
          file,
          `Products/${props.dataEdit.category}`
        );
        let newProducts = {
          ...updateData,
          image: url,
        };

        await productService.editProduct(id, newProducts);
      } else {
        await productService.editProduct(id, updateData);
      }
      dispatch(update());
      props.offModalEdit();
      toastSuccess("Update successful");
    } catch (error: any) {
      toastError("????????");
    }
  };

  return (
    <div className="modalEditProductsOverlay">
      <div className="modalEditProducts">
        <div className="modalEditProductsImg">
          <img
            src={images?.preview ? images?.preview : props.dataEdit.image}
            alt=""
          />
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
        <div className="modalEditProductsInputs">
          <div className="modalEditProductsInput">
            <h3>Product Name :</h3>
            <input
              value={updateData.productName}
              onChange={handleChangeInput}
              placeholder={props.dataEdit?.name}
              type="text"
              name="productName"
              id=""
            />
          </div>
          <div className="modalEditProductsInput">
            <h3>Product description :</h3>
            <input
              value={updateData.desc}
              onChange={handleChangeInput}
              placeholder={props.dataEdit?.desc}
              type="text"
              name="desc"
              id=""
            />
          </div>
          <div className="modalEditProductsInput">
            <h3>Price :</h3>
            <input
              value={updateData.price}
              onChange={handleChangeInput}
              placeholder={props.dataEdit?.price}
              type="text"
              name="price"
              id=""
            />
          </div>
          <div className="modalEditProductsInput">
            <h3>Brand:</h3>
            <input
              value={updateData.brand}
              onChange={handleChangeInput}
              placeholder={`${props.dataEdit?.brand} products`}
              type="text"
              name="brand"
              id=""
            />
          </div>
        </div>
        <div className="modalEditProductsActions">
          <div className="modalEditProductsInput">
            <h3>Stock :</h3>
            <input
              value={updateData.stock}
              onChange={handleChangeInput}
              placeholder={`${props.dataEdit?.stock} products`}
              type="text"
              name="stock"
              id=""
            />
          </div>
          <div className="modalEditProductsInput">
            <h3>Scale :</h3>
            <input
              value={updateData.scale}
              onChange={handleChangeInput}
              placeholder={`${props.dataEdit?.scale} products`}
              type="text"
              name="scale"
              id=""
            />
          </div>
          <div className="modalEditProductsInput">
            <h3>Scale detail :</h3>
            <input
              value={updateData.scaleDetail}
              onChange={handleChangeInput}
              placeholder={`${props.dataEdit?.scaleDetail} products`}
              type="text"
              name="scaleDetail"
              id=""
            />
          </div>
          <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={() => handleUpdateProducts(props.dataEdit.id)}
            okText="Yes"
            cancelText="No"
          >
            <button>UPDATE</button>
          </Popconfirm>
          <button onClick={() => props.offModalEdit()}>CANCEL</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminUpdateProducts;
