import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./screens/Home/Home";
import { Header } from "./components/common";
import { darkTheme } from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/404" component={() => <div>404 Not Found</div>} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
