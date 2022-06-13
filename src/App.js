import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// import Home from "./Home";
// import About from "./About";
// import Login from "./Login";
// import NotFound from "./NotFound";
// import restricted from "./Restricted";
import routes from "./routes";
const App = () => (
  <>
    <Header />
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element, exact }, idx) => (
          <Route key={idx} exact={exact} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
