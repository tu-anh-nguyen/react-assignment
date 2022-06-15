import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header";
import routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Toast from "./components/Toast";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Toast />
        <Routes>
          {routes.map(({ path, element, exact }, idx) => (
            <Route key={idx} exact={exact} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
