import { Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {
  return (
    <form action="">
      <Input
        type="text"
        value={params.name}
        onChange={(e) =>
          setParams({
            ...params,
            name: e.target.value,
          })
        }
      />
      <Select
        value={params.personId}
        onChange={(value) =>
          setParams({
            ...params,
            personId: value,
          })
        }
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </form>
  );
};
