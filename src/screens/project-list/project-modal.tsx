import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalOpen } = useProjectModal();

  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={close}>
      <h1>Drawer Screen</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
