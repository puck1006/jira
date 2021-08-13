import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectSearchParams } from "./util";
import { ErrorBox } from "component/lib";

export const ProjectListScreen = () => {
  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(params, 300));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      <ErrorBox error={error} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = false;

export const Container = styled.div`
  padding: 3.2rem;
`;
