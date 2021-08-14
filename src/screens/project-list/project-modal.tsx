import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "component/lib";
import { UserSelect } from "component/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalOpen, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { isLoading: mutateLoading, mutateAsync, error } = useMutateProject();
  const [form] = useForm();

  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    close();
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "创建项目";
  return (
    <Drawer
      width={"100%"}
      visible={projectModalOpen}
      onClose={closeModal}
      forceRender={true}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          <h1> {title} </h1>
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
              rules={[{ required: true, message: "请输入项目名称" }]}
            >
              <Input placeholder={"请输入项目名称"} />
            </Form.Item>{" "}
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门" }]}
            >
              <Input placeholder={"请输入部门"} />
            </Form.Item>{" "}
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOptionName={"负责人"} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                htmlType={"submit"}
                type={"primary"}
                loading={mutateLoading}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
};
