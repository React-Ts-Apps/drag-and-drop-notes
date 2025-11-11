import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type DragData = {
  id: number;
  offsetX: number;
  offsetY: number;
} | null;

type Note = {
  id: number;
  title: string;
  content: string;
  x: number;
  y: number;
}


const DragNotes = () => {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: '', title: '', x: 50, y: 50 }]);
  const [currentNote, setCurrentNote] = useState<DragData>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setCurrentNote(null);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!currentNote) return;

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNote.id
            ? { ...note, x: e.clientX - currentNote.offsetX, y: e.clientY - currentNote.offsetY }
            : note
        )
      );
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  })

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const noteElement = e.currentTarget;
    const rect = noteElement.getBoundingClientRect();
    setCurrentNote({
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    })
  }

  const addNewNote = () => {
    const randomX = Math.random() * (window.innerWidth - 250)
    const randomY = Math.random() * (window.innerHeight - 250)
    setNotes((prev) => [...prev, { id: notes.length + 1, title: '', content: '', x: randomX, y: randomY }])
  }

  const handleChange = (id: number, field: "title" | "content", value: string) => {
    setNotes((prev) => prev.map((note) => note.id === id ? { ...note, [field]: value } : note))
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }


  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      <button style={{
        position: "absolute",
        top: 10,
        left: "50%",
        backgroundColor: "olive",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: 8,
        cursor: "pointer",
      }}
        onClick={addNewNote}>
        Add New Note
      </button>

      {notes.map((note) => (
        <div
          onMouseDown={(e) => handleMouseDown(e, note.id)}
          style={{
            position: "absolute",
            top: note.y,
            left: note.x,
            backgroundColor: 'orange',
            color: "white",
            padding: 20,
            height: 150,
            cursor: "crosshair",
            display: "flex",
            flexDirection: "column"
          }}
          key={note.id}
        >
          <div>
            <input placeholder="Enter title"
              value={note.title}
              style={{
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                outline: "none",
                background: "transparent",
                fontWeight: "bold",
                marginBottom: 5
              }}
              onChange={(e) => handleChange(note.id, "title", e.target.value)}
            />
            <Trash2 color="red" size={20} onClick={() => deleteNote(note.id)}
              style={{
                cursor: "pointer"
              }} />
          </div>
          <textarea placeholder="Write something...." value={note.content}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              padding: 5,
              flex: 1,
              overflow: "hidden"
            }}
            onChange={(e) =>
              handleChange(note.id, "content", e.target.value)}
            onMouseDown={(e) => e.stopPropagation()} />
        </div>
      ))}
    </div>
  );
};
export default DragNotes;
