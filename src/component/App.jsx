import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Data could not be retrieved: ", error);
      });
  }, []);

  function onAdd(newNote) {
    axios
      .post("http://localhost:5000/notes", newNote)
      .then((response) => {
        setNotes((prevNotes) => ([...prevNotes, response.data]));
      })
      .catch((error) => {
        console.error("Error adding Note: ", error);
      });
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
      setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem._id !== id));
    })
    .catch((error) =>{
      console.log('Error with Delete: ', error);
    });
  }

  function editNote(id, editContent) {
    axios.put(`http://localhost:5000/notes/${id}`, editContent)
      .then((response)=>{
        setNotes((prevNotes)=>
          prevNotes.map((noteItem) =>(noteItem._id === id ? response.data : noteItem))
        );
      })
      .catch((error)=>{
        console.log('Edit Failed: ', error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={onAdd} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
