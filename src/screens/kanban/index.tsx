import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "component/drag-and-drop";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ScreenContainer } from "screens/project-list";
import { useDocumentTitle } from "utils";
import { useKanbans, useRecordKanban } from "utils/kanban";
import { useRecordTask, useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTaskSearchParams,
  useTasksQueryKey,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: project } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsloading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: tasksIsloading } = useTasks(useTaskSearchParams());
  const isloading = kanbanIsloading || tasksIsloading;

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: recordKanban } = useRecordKanban(useKanbansQueryKey());
  const { data: allTasks = [] } = useTasks(useTaskSearchParams());
  const { mutate: reorderTask } = useRecordTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      console.log(source, destination, type);
      if (!destination) {
        return;
      }
      if (type === "column") {
        const fromId = kanbans?.[source.index].id;
        const referenceId = kanbans?.[destination.index].id;
        if (!fromId || !referenceId || fromId === referenceId) {
          return;
        }
        const innerType = destination.index > source.index ? "after" : "before";

        recordKanban({ fromId, referenceId, type: innerType });
      }

      if (type === "Row") {
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === +source.droppableId
        )[source.index];
        const toTask = allTasks.filter(
          (task) => task.kanbanId === +destination.droppableId
        )[destination.index];

        if (
          source.droppableId === destination.droppableId &&
          fromTask?.id === toTask?.id
        ) {
          return;
        }

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          type:
            +source.droppableId === +destination.droppableId &&
            destination.index > source.index
              ? "after"
              : "before",
          // type:
          //   source.droppableId === destination.droppableId ?
          //   destination.index > source.index
          //     ? "after"
          //     : "before" : 'after',
          fromKanbanId: +source.droppableId,
          toKanbanId: +destination.droppableId,
        });
      }
    },
    [allTasks, kanbans, recordKanban, reorderTask]
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
