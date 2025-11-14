import { useCallback } from "react";
import { NoteProps } from "../types/notes";
import { COLORS } from "../constants/constants";

export function useNotes(notes: NoteProps[], setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>) {

    const addNote = useCallback(() => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 250))
        const randomY = Math.floor(Math.random() * (window.innerHeight - 250))
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        const newNote = { id: notes.length + 1, title: '', content: '', x: randomX, y: randomY, color: randomColor }
        setNotes(prev => [...prev, newNote])
    }, [notes.length, setNotes])

    const deleteNote = (id: number) => {
        setNotes((prev) => prev.filter(note => note.id !== id))
    }

    const updateNote = (id: number, field: "title" | "content" | "color", value: string) => {
        setNotes((prev) => prev.map(note => note.id === id ? { ...note, [field]: value } : note))
    }

    const moveNote = (id: number, newX: number, newY: number) => {
        setNotes((prev) => prev.map(note => note.id === id ? { ...note, x: newX, y: newY } : note))
    }

    return { addNote, deleteNote, updateNote, moveNote }
}