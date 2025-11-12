import { AddNoteProps } from "../../types/notes"

const AddNoteButton = ({ onAddNote }: AddNoteProps) => {
  return (
    <>
      <button className="add-note-button"
        onClick={onAddNote}>
        Add New Note
      </button>
    </>
  )
}
export default AddNoteButton