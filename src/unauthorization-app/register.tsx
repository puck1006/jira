import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (value: { username: string; password: string }) => {
    register(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="text" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
