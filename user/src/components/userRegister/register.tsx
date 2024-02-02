import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../utils/toast";

type FieldType = {
  fullName?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
};
interface props {
  btnLogin: () => void;
}
const Register = ({ btnLogin }: props) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    address: "",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/img%20user%2Favatar-trang-4.jpg?alt=media&token=da8f7c53-e039-4a0c-b30b-ddbf7084adf9",
    role: 1,
    status: true,
    phone: "",
    cart: [],
  });

  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const userService = new UserService();
      const response = await userService.register(formData);
      if (response.status == 201) {
        navigate("/login", { state: true });
        btnLogin();
        toastSuccess("Register successfully");
      }
    } catch (error: any) {
      notifyError(error.response.data);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleLogin = () => {
    btnLogin();
  };
  const handleChangeFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <ToastContainer />
      <Form.Item<FieldType>
        label="FullName"
        name="fullName"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          type="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChangeFormData}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChangeFormData}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          name="password"
          value={formData.password}
          onChange={handleChangeFormData}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input
          name="address"
          value={formData.address}
          onChange={handleChangeFormData}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phoneNumber!" }]}
      >
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChangeFormData}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="btn_register">
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button
          onClick={handleLogin}
          className="btn_login"
          style={{
            marginLeft: 40,
            backgroundColor: "#fe635e",
            color: "white",
            border: "none",
          }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
