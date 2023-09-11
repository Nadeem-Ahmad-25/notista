import React, {useContext} from "react";
import notecontext from "../context/notes/NoteContext";


export default function Noteitem(props) {
  const { note , updatenote} = props;
  const context =  useContext(notecontext)
  const { deletenote }= context
 
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">Title : {note.title}</h5>

          <p className="card-text">Description : {note.description}</p>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updatenote(note)}}></i>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
}
