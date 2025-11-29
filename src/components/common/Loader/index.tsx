import Image from "next/image";
import icon from "@/assets/imgs/svg/icon-white.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-primary ">
      <Image alt="loader" src={icon} height={100} width={100} />
      <Spin
        indicator={
          <LoadingOutlined
            className="text-white"
            style={{ fontSize: 30 }}
            spin
          />
        }
        size="small"
      />
    </div>
  );
};

export default Loader;
