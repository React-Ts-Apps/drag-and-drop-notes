
import { NoteItemProps } from "../../types/notes"
import DeleteButton from "../ui/DeleteButton"

const Note = ({ note, onChange, onMouseDown, deleteNote }: NoteItemProps) => {
    return (
        <div className="sticky-note"
            style={{
                top: note.y,
                left: note.x,
                backgroundColor: note.color
            }}
            onMouseDown={(e) => onMouseDown(e, note.id)}
        >
            <div>
                <input placeholder="Enter title"
                    value={note.title}
                    className="note-title"
                    onChange={(e) => onChange(note.id, "title", e.target.value)}
                />
                <DeleteButton color="red" size={15} onClick={() => deleteNote(note.id)} />
            </div>
            <textarea placeholder="Write something...." value={note.content}
                className="note-content"
                onChange={(e) =>
                    onChange(note.id, "content", e.target.value)}
                onMouseDown={(e) => e.stopPropagation()} />
        </div>
    )
}
export default Note