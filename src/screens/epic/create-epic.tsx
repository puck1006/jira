import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "component/lib";
import { useEffect } from "react";
import { useProjectIdInUrl } from "screens/kanban/util";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./util";

type epicProps = Pick<DrawerProps, "visible"> & { onClose: () => void };

export const CreateEpic = (props: epicProps) => {
  const {
    mutateAsync: addEpic,
    isLoading,
    error,
  } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      width={"100%"}
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Container>
          <h1> 创建任务组 </h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
            style={{ width: "40rem" }}
          >
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "请输入任务组名" }]}
            >
              <Input placeholder={"请输入任务组名"} />
            </Form.Item>{" "}
            <Form.Item style={{ textAlign: "right" }}>
              <Button htmlType={"submit"} type={"primary"} loading={isLoading}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
