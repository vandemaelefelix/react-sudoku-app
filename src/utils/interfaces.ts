export interface SudokuState {
    board: Array<Cell[]>;
    selectedCell: Cell | null;
    isEditNotes: boolean;
    settings: Settings;
}

export interface Cell {
    id: number;
    value: number | null;
    isSelected: boolean;
    row: number;
    index: number;
    isInline: boolean;
    isCorrect: boolean;
    isEditable: boolean;
    isSameAsSelected: boolean;
    notes: number[];
}

export interface UpdateCellPayload {
    cell: Cell;
    value: number | null;
}

export interface UpdateNotesPayload {
    cell: Cell;
    note: number | null;
}

export interface Settings {
    guides?: boolean;
    showMistakes?: boolean;
    highlightSameNumbers?: boolean;
}
