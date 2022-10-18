import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesContextProvider } from "./context/notes-context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotesContextProvider>
    <App />
  </NotesContextProvider>
);
