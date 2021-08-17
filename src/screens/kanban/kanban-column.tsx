import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbansQueryKey, useTaskModal, useTaskSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mask } from "component/masl";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "component/lib";
import { forwardRef } from "react";
import { Drag, Drop, DropChild } from "component/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((task) => task.id === id)?.name;
  return <img src={name === "task" ? taskIcon : bugIcon} alt="task-icon" />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      key={task.id}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      onClick={() => startEdit(task.id)}
    >
      <p>
        <Mask name={task.name} keyword={keyword || ""} />
      </p>
      <TaskTypeIcon id={task.id} />
    </Card>
  );
};

export const KanbanColumn = forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTaskSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

    return (
      <Container ref={ref} {...props}>
        <Row between={true}>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} />
        </Row>
        <TaskContainer>
          <Drop
            type={"Row"}
            direction={"vertical"}
            droppableId={"task" + kanban.id}
          >
            <DropChild>
              {tasks?.map((task, index) => (
                <Drag
                  draggableId={"task" + task.id}
                  index={index}
                  key={task.id}
                >
                  <div>
                    <TaskCard task={task} key={task.id} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanban={kanban} />
        </TaskContainer>
      </Container>
    );
  }
);

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗?",
      onOk() {
        mutateAsync({ id: kanban.id });
      },
    });
  };

  const Overlay = (
    <Menu>
      <Menu.Item key={"delete"}>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={Overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
  display: flex;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  flex-direction: column;
`;
