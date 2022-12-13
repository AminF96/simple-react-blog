import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./style/index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
