import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "component/drag-and-drop";
import { DragDropContext } from "react-beautiful-dnd";
import { ScreenContainer } from "screens/project-list";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: project } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsloading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: tasksIsloading } = useTasks(useTaskSearchParams());
  const isloading = kanbanIsloading || tasksIsloading;

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1> {project?.name}列表 </h1>
        <SearchPanel />
        {isloading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnContainer>
            <Drop
              type={"column"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    draggableId={"kanban" + kanban.id}
                    index={index}
                    key={kanban.id}
                  >
                    <KanbanColumn key={kanban.id} kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban key={"createKanban"} />
            <TaskModal />
          </ColumnContainer>
        )}
      </ScreenContainer>
    </DragDropContext>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
