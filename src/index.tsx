import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/main/App";

const root = createRoot(document.querySelector("#app")!);

root.render(<App />);
