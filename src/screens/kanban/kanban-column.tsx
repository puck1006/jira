import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTaskSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((task) => task.id === id)?.name;
  return <img src={name === "task" ? taskIcon : bugIcon} alt="task-icon" />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
            <h3> {kanban.name} </h3>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.id} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
  display: flex;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  flex-direction: column;
`;
