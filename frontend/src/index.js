import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://86552032b4174f4aba42db8c7ac8de36@o1126629.ingest.sentry.io/6169024",
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(<App />, document.getElementById("root"));
