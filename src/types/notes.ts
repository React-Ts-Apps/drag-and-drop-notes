export type NoteProps = {
    id: number;
    title: string;
    content: string;
    x: number;
    y: number;
}

export type NotePositionProps = {
    id: number;
    x: number;
    y: number
} | null

export type AddNoteProps = {
    onAddNote: () => void;
}

export type NoteItemProps = {
    note: NoteProps;
    onChange: (id: number, field: 'title' | 'content', value: string) => void;
    onMouseDown: (e: React.MouseEvent, id: number) => void;
}