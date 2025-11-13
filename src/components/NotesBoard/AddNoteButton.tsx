import { AddNoteProps } from "../../types/notes"

const AddNoteButton = ({ addNote }: AddNoteProps) => {
  return (
    <>
      <button className="add-note-button"
        onClick={addNote}>
        Add New Note
      </button>
    </>
  )
}
export default AddNoteButton