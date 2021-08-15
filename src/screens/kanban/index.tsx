import styled from "@emotion/styled";
import { ScreenContainer } from "screens/project-list";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <ScreenContainer>
      <h1> {project?.name}列表 </h1>
      <SearchPanel />
      <KanbanContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanContainer>
    </ScreenContainer>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
