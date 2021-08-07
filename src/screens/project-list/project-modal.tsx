import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      width={"100%"}
      visible={props.projectModalVisible}
      onClose={props.onClose}
    >
      <h1>Drawer Screen</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
