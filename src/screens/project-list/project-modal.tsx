import { Button, Drawer } from "antd";

export const ProjectModal = (
  projectMoalVisible: boolean,
  onClose: () => void
) => {
  return (
    <Drawer width={"100%"} visible={projectMoalVisible} onClose={onClose}>
      <h1>Drawer Screen</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
