import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <div>
      <h1> {project?.name}列表 </h1>
      <KanbanContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanContainer>
    </div>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  overflow: hidden;
`;
