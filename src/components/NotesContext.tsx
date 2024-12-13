import React, { createContext, useReducer, useContext } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  color?: string;
};

type NotesState = {
  notes: Note[];
};

type NotesAction =
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "EDIT_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: Note };

const initialState: NotesState = {
  notes: [],
};

const NotesContext = createContext<{
  state: NotesState;
  dispatch: React.Dispatch<NotesAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
