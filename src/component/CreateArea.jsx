import React, { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

const CreateArea = (props) => {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.addNote(note);
    setNote({
      title: "",
      content: "",
    });
  }

  function expand() {
    setExpanded(true);
  }
  return (
    <div>
      <form className="create-note">
        <input
          onClick={expand}
          name="title"
          value={note.title}
          placeholder="Title"
          onChange={handleChange}
          type="text"
        />
        {isExpanded && (
          <textarea
            name="content"
            value={note.content}
            placeholder="Write content here"
            onChange={handleChange}
            rows={3}
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <NoteAddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateArea;
