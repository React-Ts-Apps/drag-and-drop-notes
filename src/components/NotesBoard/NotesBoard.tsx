import { useEffect, useState } from "react"
import AddNoteButton from "./AddNoteButton"
import Note from "./Note"
import { NotePositionProps, NoteProps } from "../../types/notes"
import { COLORS } from "../../constants/constants"

const initialNotes = [{
    id: 1, title: 'Why you are here...', content: 'Sticky thoughts for a busy mind !!', x: 150, y: 150, color: "#FFD966"
}]

const NotesBoard = () => {
    const [notes, setNotes] = useState<NoteProps[]>(() => {
        const saved = localStorage.getItem('notes')
        const parsed = saved ? JSON.parse(saved) : []
        return parsed.length ? parsed : initialNotes
    })
    const [currentNote, setCurrentNote] = useState<NotePositionProps>(null)

    useEffect(() => {

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    })

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    const handleMouseUp = () => {
        setCurrentNote(null)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!currentNote) return
        setNotes(prev => prev.map((note) => (
            note.id === currentNote.id ? { ...note, x: e.clientX - currentNote.x, y: e.clientY - currentNote.y } : note
        )))
    }

    const addNote = () => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 250))
        const randomY = Math.floor(Math.random() * (window.innerHeight - 250))
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

        setNotes(prev => [...prev, { id: notes.length + 1, title: '', content: '', x: randomX, y: randomY, color: randomColor }])
    }

    const handleChange = (id: number, field: 'title' | 'content', value: string) => {
        setNotes((prev) => prev.map(note => note.id === id ? { ...note, [field]: value } : note))
    }

    const handleMouseDown = (e: React.MouseEvent, id: number) => {
        const note = e.currentTarget;
        const rect = note.getBoundingClientRect();

        setCurrentNote({
            id,
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        })
    }

    const deleteNote = (id: number) => {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    return (
        <div className="notes-board">
            <AddNoteButton onAddNote={addNote} />
            {notes.map((note) => (
                <Note key={note.id} note={note}
                    onChange={handleChange}
                    onMouseDown={handleMouseDown}
                    deleteNote={deleteNote}
                />
            ))}
        </div>
    )
}
export default NotesBoard