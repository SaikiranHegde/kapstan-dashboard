import React from "react";
import { Flex, Spin } from "antd";

const Loader: React.FC = () => {
  return (
    <Flex align="center" justify="center" gap="middle">
      <Spin size="large" />
      {/* <Skeleton active /> */}
    </Flex>
  );
};

export default Loader;
