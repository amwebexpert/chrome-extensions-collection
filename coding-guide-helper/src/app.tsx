import { Flex, Typography } from "antd";
import { useEffect, type FunctionComponent } from "react";
import { Environment } from "./app.types";
import { Version } from "./components/version";
import { getBrowserInstance } from "./utils/chrome.utils";

console.log('This is a UI');

export const App: FunctionComponent = () => {
  const { title } = Environment;

  useEffect(() => {
    console.log('getBrowserInstance', getBrowserInstance());
  }, []);

  return (
    <Flex vertical={true} style={{minWidth: 600}}>
      <Flex gap="middle" justify="center">
        <Typography.Text>{title}</Typography.Text>
      </Flex>

      <Version />
    </Flex>
  );
};

export default App;
