import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./adminLogin.css";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/reducers/user";
import { ToastContainer } from "react-toastify";

type FieldType = {
  email?: string;
  password?: string;
};
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    const response = await dispatch(handleLogin(formData) as any).unwrap();
    if (response?.response?.status === 400) {
      console.log(response.response.data);
      toastError("Email/Password is incorrect!");
      return;
    }
    console.log(response);
    if (response?.status === 201 || response?.status === 200) {
      if (response.data.user.status === false) {
        toastError("This account is Blocked");
      } else {
        if (response.data.user.role === 2) {
          navigate("/adminPage");
          toastSuccess("Welcome ADMIN");
        } else {
          toastError("Sorry, this email is for user, not admin.");
        }
      }
    }
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
    <div className="admin_login_page">
      <ToastContainer />
      <div className ="admin_login_background">
        <h2> HELLO ADMIN</h2>
        <div className="admin_login_box">
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
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChangeFormData}
                className="admin_input"
                placeholder="your admin email..."
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChangeFormData}
                className="admin_input"
                placeholder="your password..."
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleLogin}
                style={{ marginLeft: "130px" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
