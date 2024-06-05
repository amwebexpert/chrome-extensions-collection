import { Typography } from "antd";
import type { FunctionComponent } from "react";
import { Environment } from "./app.types";
import { Version } from "./components/version";

export const App: FunctionComponent = () => {
  const { title } = Environment;

  return (
    <>
      <Typography.Text>{title}</Typography.Text>

      <Version />
    </>
  );
};

export default App;
