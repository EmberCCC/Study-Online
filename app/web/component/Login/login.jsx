import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import services from "../../framework/request";

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const judegeLogin = async () => {
    try {
      const res = await services.get("/api/user/self");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (data) => {
    try {
      const res = await services.post("/api/user/login", { ...data });
      if (res.success) {
        navigate("/console");
      } else {
        message.warning(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = () => {
    form
      .validateFields()
      .then((data) => {
        login(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    judegeLogin();
  }, []);
  return (
    <div className="w-[400px] mx-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            登陆
          </h2>
        </div>

        <div className="mt-10">
          <Form form={form} className="mx-auto" name="basic" autoComplete="off">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 w-fit"
              >
                用户名
              </label>
              <div className="mt-2">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                  className="w-full"
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  密码
                </label>
              </div>
              <div className="mt-2">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  className="w-full"
                >
                  <Input.Password className="w-full" />
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="flex flex-row justify-between">
            <Button onClick={onFinish} type="primary">
              登陆
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              注册
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
