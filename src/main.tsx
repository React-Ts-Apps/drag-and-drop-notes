import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/notes.css";
import NotesBoard from "./components/NotesBoard/NotesBoard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesBoard />
  </StrictMode>
);
