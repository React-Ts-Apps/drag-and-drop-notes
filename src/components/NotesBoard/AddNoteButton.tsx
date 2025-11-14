import { AddNoteProps } from "../../types/notes"
import IconButton from "../ui/Button"
import { PlusOutlined } from '@ant-design/icons';

const AddNoteButton = ({ addNote }: AddNoteProps) => {
  return (
    <IconButton
      onClick={addNote}
      icon={<PlusOutlined />}
      shape="circle"
      type="default"
      title="Add Note"
      className="add-note-button"
    />
  )
}
export default AddNoteButton