import styled from "@emotion/styled";
import { List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
