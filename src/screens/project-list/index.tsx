import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(params, 300);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List dataSource={list} users={users} />
    </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
`;
