
import React, { useContext, useState } from 'react'
import notecontext from "../context/notes/NoteContext";

export default function AddNotes(props) {
    const context =  useContext(notecontext)
    const {addnote}= context
    const [notes, setNotes] = useState({title:"", description: "", tag: ""})
  

    const handleaddnote = (e)=>{
        e.preventDefault();
        if (!notes.title.trim() || !notes.description.trim() || !notes.tag.trim()) {
          props.showAlert("Please enter the specified feilds properly", "warning");
          
        }else{
        addnote(notes.title, notes.description, notes.tag);
        setNotes({title:"", description: "", tag: ""})
        props.showAlert("notes added successfully", "success");
        }
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
          <input style={{
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
                    }}
            type="text"
            className="form-control form-control-lg" // or form-control-sm
            id="title"
            name="title"
            placeholder="Enter a title"
            value={notes.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           Description
          </label>
          <input style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            type="text"
            className="form-control form-control-lg" // or form-control-sm
            id="description"
            name="description"
            placeholder="Enter a description"
            value={notes.description}
            aria-describedby="emailHelp"
            onChange={onChange}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            type="text"
            className="form-control form-control-lg"
            id="tag"
            placeholder="Enter a valid tag."
            value = {notes.tag}
            name='tag'
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <button  type="submit" className="btn btn-primary" onClick={handleaddnote}>
          Submit
        </button>
      </form>
      </div>
    </div>
  )
}
