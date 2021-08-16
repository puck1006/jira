import { Button, Input } from "antd";
import { Row } from "component/lib";
import { TypeSelect } from "component/type-select";
import { UserSelect } from "component/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./util";

export const SearchPanel = () => {
  const params = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      name: undefined,
      processodId: undefined,
      typeId: undefined,
    });
  };

  return (
    <Row gap={true} marginBottom={4}>
      <Input
        style={{ width: "20rem" }}
        value={params.name}
        placeholder={"请输入任务名"}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={"负责人"}
        value={params.processodId}
        onChange={(value) => {
          setSearchParams({ processodId: value });
        }}
      />
      <TypeSelect
        defaultOptionName={"类型"}
        value={params.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}> 重制筛选器 </Button>
    </Row>
  );
};
