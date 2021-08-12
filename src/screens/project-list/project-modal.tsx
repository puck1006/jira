import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectListModelOpen,
  projectListActions,
} from "./project-list.slice";

export const ProjectModal = (props: {}) => {
  const projectModalVisible = useSelector(getProjectListModelOpen);
  const dispatch = useDispatch();

  return (
    <Drawer
      width={"100%"}
      visible={projectModalVisible}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>Drawer Screen</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
