import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin
      indicator={<LoadingOutlined className="text-primary" spin />}
      size="small"
    />
  );
};
export default Loading;
