import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState({
    title: props.title,
    content: props.content,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  }

  function handleDelete() {
    props.onDelete(props.id);
  }
  function handleEdit() {
    setIsEditing(true);
  }
  function handleSave() {
    props.onEdit(props.id, editContent);
    setIsEditing(false);
  }

  return (
    <div className="note">
      <h1 className="title-edit">
        {isEditing ? (
          <input
            name="title"
            value={editContent.title}
            onChange={handleChange}
          />
        ) : (
          props.title
        )}
      </h1>

      <p className="content-edit">
        {isEditing ? (
          <textarea
            name="content"
            value={editContent.content}
            onChange={handleChange}
          />
        ) : (
          props.content
        )}
      </p>

      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      {isEditing ? (
        <button onClick={handleSave}> Save</button>
      ) : (
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
      )}
    </div>
  );
}

export default Note;
