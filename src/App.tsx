
import { NotesProvider } from "./components/NotesContext";
import NotesManager from "./components/NotesManager";
import "./index.css";

const App = () => {
  return (
    <NotesProvider>
      <NotesManager />
    </NotesProvider>
  );
};

export default App;
