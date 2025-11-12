import { NoteItemProps } from "../../types/notes"

const Note = ({ note, onChange, onMouseDown }: NoteItemProps) => {
    return (
        <div className="sticky-note"
            style={{
                top: note.y,
                left: note.x
            }}
            onMouseDown={(e) => onMouseDown(e, note.id)}
        >
            <input placeholder="Enter title"
                value={note.title}
                className="note-title"
                onChange={(e) => onChange(note.id, "title", e.target.value)}
            />
            <textarea placeholder="Write something...." value={note.content}
                className="note-content"
                onChange={(e) =>
                    onChange(note.id, "content", e.target.value)}
                onMouseDown={(e) => e.stopPropagation()} />
        </div>
    )
}
export default Note