import React, { useEffect, useRef, useState } from "react";

type DragData = {
  id: number;
  offsetX: number;
  offsetY: number;
} | null;

const initialNotes = [
  { id: 1, content: "Hardwork is key of success", x: 50, y: 50 },
  { id: 2, content: "Set your goals", x: 150, y: 150 },
  { id: 3, content: "Divide goal as subgoals", x: 250, y: 250 },
];
const DragNotes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const noteRef = useRef<DragData>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      noteRef.current = null;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!noteRef.current) return;

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteRef.current?.id
            ? { ...note, x: e.clientX - noteRef.current.offsetX, y: e.clientY - noteRef.current.offsetY }
            : note
        )
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const noteElement = e.currentTarget;
    const rect = noteElement.getBoundingClientRect();
    noteRef.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  return (
    <div>
      {notes.map((note) => (
        <div
          onMouseDown={(e) => handleMouseDown(e, note.id)}
          style={{
            position: "absolute",
            top: note.y,
            left: note.x,
            backgroundColor: "olive",
            color: "white",
            padding: 20,
            height: 30,
            cursor: "crosshair",
          }}
          key={note.id}
        >
          {note.content}
        </div>
      ))}
    </div>
  );
};
export default DragNotes;
