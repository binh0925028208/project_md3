import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PayPalScriptProvider
        options={{
          clientId:
            "AYmeMII_udXSt2zcqyZxF-XL1dwINozZlpE__Q0iEABtCwvTremfvngc70TwO3uUQhd9uFyw4Tuts-__",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </Provider>
);
