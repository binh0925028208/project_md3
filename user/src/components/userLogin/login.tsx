import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/reducers/user";

type FieldType = {
  email?: string;
  password?: string;
  phone?: string;
  btnRegister: () => void;
};
const Login = ({ btnRegister }: FieldType) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    const response = await dispatch(handleLogin(formData) as any).unwrap();
    if (response?.response?.status == 400) {
      console.log(response.response.data);
      toastError("Email/Password is incorrect!");
      return;
    }
    console.log(response);
    if (response?.status == 201 || response?.status == 200) {
      if (response.data.user.status === false) {
        toastError("This account is Blocked, please contract us!");
      } else {
        navigate("/");
        toastSuccess("Welcome to Gundam-Universe Shop");
      }
    }
  };

  const changeToRegister = () => {
    btnRegister();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Login
        </Button>
        <Button className="registerBtn" onClick={changeToRegister}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
