import React from "react";
import { BrowserRouter, Route, Link, Switch as Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// import Home from "./Home";
// import About from "./About";
// import Login from "./Login";
// import NotFound from "./NotFound";
// import restricted from "./Restricted";
import routes from "./routes";
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        {routes.map(({ path, element, exact }, idx) => (
          <Route key={idx} exact={exact} path={path} component={element} />
        ))}
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
