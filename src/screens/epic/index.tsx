import { Button, List } from "antd";
import { Row } from "component/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/util";
import { ScreenContainer } from "screens/project-list";
import { useDocumentTitle } from "utils";
import { useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams } from "./util";

export const EpicScreen = () => {
  useDocumentTitle("任务组");
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const [createEpicVisible, setCreateEpicVisible] = useState(false);

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1> {currentProject?.name}任务组 </h1>
        <Button
          onClick={() => {
            setCreateEpicVisible(true);
          }}
          type={"link"}
        >
          创建任务组
        </Button>
      </Row>
      {
        <List
          style={{ overflowY: "scroll" }}
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span> {epic.name} </span>
                    <Button type={"link"}>删除</Button>
                  </Row>
                }
                description={
                  <div>
                    <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                    <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((item) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${item.id}`}
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                ))}
            </List.Item>
          )}
        />
      }
      <CreateEpic
        visible={createEpicVisible}
        onClose={() => setCreateEpicVisible(false)}
      />
    </ScreenContainer>
  );
};
