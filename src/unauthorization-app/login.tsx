import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthorization-app";
import { useAsync } from "../utils/use-async";
import { useDispatch } from "react-redux";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwSyncError: true });
  const handleSubmit = async (value: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(value));
    } catch (e) {
      onError(e);
    }
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
        <LongButton htmlType="submit" type="primary" loading={isLoading}>
          {" "}
          登录{" "}
        </LongButton>
      </Form.Item>
    </Form>
  );
};
