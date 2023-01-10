import { BrowserRouter as Router } from "react-router-dom";
import { render as testingRender } from "@testing-library/react";
import { MuiThemeProvider } from "@material-ui/core";
import { darkTheme } from "../theme";

const render = (ui, renderOptions) => {
  const Wrapper = ({ children }) => (
    <Router>
      <MuiThemeProvider theme={darkTheme}>{children}</MuiThemeProvider>
    </Router>
  );

  return {
    ...testingRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
};

export { render };
