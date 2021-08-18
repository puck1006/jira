import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "component/lib";

export const ProjectListScreen = () => {
  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(params, 300));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          {" "}
          创建项目{" "}
        </ButtonNoPadding>
      </Row>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      <ErrorBox error={error} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </ScreenContainer>
  );
};
ProjectListScreen.whyDidYouRender = false;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;
