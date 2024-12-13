import { useState } from "react";
import { useNotes } from "./NotesContext";
import { v4 as uuidv4 } from "uuid";
import "../components/NotesManager.css";

const NotesManager = () => {
  const { state, dispatch } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  const stickyColors = [
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#8BC34A",
    "#00BCD4",
    "#9C27B0",
  ];
  const getRandomColor = () =>
    stickyColors[Math.floor(Math.random() * stickyColors.length)];

  const handleAddOrEditNote = () => {
    if (!currentNote.title || !currentNote.content) {
      alert("Title and Content are required!");
      return;
    }

    if (currentNote.id) {
      dispatch({ type: "EDIT_NOTE", payload: currentNote });
    } else {
      dispatch({
        type: "ADD_NOTE",
        payload: { ...currentNote, id: uuidv4(), color: getRandomColor() },
      });
    }
    setCurrentNote({ id: "", title: "", content: "" });
  };

  const filteredNotes = state.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h1> Notes App</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="note-inputs">
        <input
          type="text"
          placeholder="Title"
          value={currentNote.title}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, title: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          value={currentNote.content}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, content: e.target.value })
          }
        />
        <button onClick={handleAddOrEditNote}>
          {currentNote.id ? "Edit Note" : "Add Note"}
        </button>
      </div>
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div
          key={note.id}
          className="note"
          style={{ backgroundColor: note.color || getRandomColor() }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-buttons">
            <button onClick={() => setCurrentNote(note)}>Edit</button>
            <button onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
              Delete
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default NotesManager;
