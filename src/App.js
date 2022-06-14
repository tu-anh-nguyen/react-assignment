import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header";
import routes from "./routes";
const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, element, exact }, idx) => (
          <Route key={idx} exact={exact} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
