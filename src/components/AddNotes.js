
import React, { useContext, useState } from 'react'
import notecontext from "../context/notes/NoteContext";

export default function AddNotes() {
    const context =  useContext(notecontext)
    const {addnote}= context
    const [notes, setNotes] = useState({title:"", description: "", tag: ""})

    const handleaddnote = (e)=>{
        e.preventDefault();
        addnote(notes.title, notes.description, notes.tag);
        setNotes({title:"", description: "", tag: ""})
    }
   
    const onChange = (e)=>{
        setNotes({...notes, [e.target.id]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h2>Add notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label> 
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            value = {notes.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value = {notes.description}
            name='description'
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value = {notes.tag}
            name='tag'
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleaddnote}>
          Submit
        </button>
      </form>
      </div>
    </div>
  )
}
