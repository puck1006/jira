import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TypeSelect } from "component/type-select";
import { UserSelect } from "component/user-select";
import { useEffect } from "react";
import { useEditTask } from "utils/kanban";
import { useTaskModal, useTasksQueryKey } from "./util";

export const TaskModal = () => {
  const [form] = useForm();
  const { close, editingTask, editingTaskId } = useTaskModal();

  const { mutateAsync: editTask, isLoading: submitLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    form.resetFields();
    close();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  return (
    <Modal
      onCancel={onCancel}
      visible={!!editingTaskId}
      okText={"确定"}
      onOk={onOk}
      forceRender={true}
      cancelText={"取消"}
      confirmLoading={submitLoading}
      title={"编辑任务"}
    >
      <Form
        form={form}
        initialValues={editingTask}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"经办人"}
          name={"processorId"}
          rules={[{ required: true, message: "请选择经办人" }]}
        >
          <UserSelect defaultOptionName={"负责人"} />
        </Form.Item>{" "}
        <Form.Item
          label={"类型"}
          name={"typeId"}
          rules={[{ required: true, message: "请选择类型" }]}
        >
          <TypeSelect defaultOptionName={"类型"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
