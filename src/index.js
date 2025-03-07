import React from "react";
import ReactDOM from "react-dom";
import Helmet from "react-helmet";
import "./index.css";
import SearchField from "./front-end/SearchField";
import reportWebVitals from "./reportWebVitals";
import tabFavicon from "./assets/Erin.ico";

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      {...{
        title: "git-search",
        link: [
          { rel: "icon", href: tabFavicon },
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          { rel: "preconnect", href: "https://fonts.gstatic.com" },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
          },
        ],
      }}
    />
    <SearchField />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
