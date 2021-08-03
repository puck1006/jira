import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter(a, b) {
            return a.name.localeCompare(b.name);
          },
        },
        {
          title: "负责人",
          render(_, project) {
            return (
              <span key={project.id}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
