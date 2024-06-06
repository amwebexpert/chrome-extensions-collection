import { Flex, Typography } from "antd";
import type { FunctionComponent } from "react";
import { Environment } from "./app.types";
import { Version } from "./components/version";

export const App: FunctionComponent = () => {
  const { title } = Environment;

  return (
    <>
      <Flex gap="middle" justify="center">
        <Typography.Text>{title}</Typography.Text>
      </Flex>
      <Version />
    </>
  );
};

export default App;
