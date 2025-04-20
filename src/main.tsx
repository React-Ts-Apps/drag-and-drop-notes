import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DragNotes from "./DragNotes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DragNotes />
  </StrictMode>
);
