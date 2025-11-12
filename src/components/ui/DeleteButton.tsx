import { Trash2 } from "lucide-react"
import { DeleteButtonProps } from "../../types/notes"

const DeleteButton = ({ color, size, onClick }: DeleteButtonProps) => {
    return <Trash2 color={color} size={size}
        style={{
            cursor: "pointer"
        }}
        onClick={onClick} />
}
export default DeleteButton