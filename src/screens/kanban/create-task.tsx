import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { Kanban } from "types/kanban";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanban }: { kanban: Kanban }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputModal, setInputModal] = useState(false);

  const projectId = useProjectIdInUrl();
  const submit = async () => {
    await addTask({
      projectId,
      name,
      kanbanId: kanban.id,
    });

    setInputModal(false);
    setName("");
  };

  const toggle = () => setInputModal((modal) => !modal);

  useEffect(() => {
    if (!inputModal) {
      setName("");
    }
  }, [inputModal]);

  if (!inputModal) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        placeholder={"要做点什么事情?"}
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
        onBlur={toggle}
      />
    </Card>
  );
};
