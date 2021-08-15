import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-column";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();

  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"请输入看板名称"}
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
};
