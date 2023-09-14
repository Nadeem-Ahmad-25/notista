import React, { useContext, useEffect, useRef , useState} from "react";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import notecontext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const context = useContext(notecontext);
  const { notes, getnote , editnote} = context;
  const ref = useRef(null);
  const refclose = useRef(null);
  const navigate = useNavigate();

  const [notes1, setNotes] = useState({id:"", etitle:"", edescription: "", etag: ""})

  useEffect(() => {
    if(localStorage.getItem('token')){
    getnote();
    }else{
      navigate('/login');
    }
     // eslint-disable-next-line
  }, []);

  const updatenote = (currnote) => {
    ref.current.click();
    setNotes({id: currnote._id, etitle: currnote.title, edescription: currnote.description, etag: currnote.tag});
   
  };
  
    const handleclick = (e)=>{
        console.log("updaing the note ", notes1);
        editnote(notes1.id, notes1.etitle, notes1.edescription, notes1.etag);
        refclose.current.click();
        props.showAlert("notes updated successfuly ", "success");
    }
    const onChange = (e)=>{
        setNotes({...notes1, [e.target.id]: e.target.value})
    }
  return (
    <>
      <AddNotes showAlert={props.showAlert} />
      <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  
</button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
               Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label> 
          <input
            type="text"
            className="form-control"
            id="etitle"
            name='etitle'
            value={notes1.etitle}
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
            id="edescription"
            value={notes1.edescription}
            name='edescription'
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
            id="etag"
            value={notes1.etag}
            name='etag'
            onChange={onChange}
          />
        </div>
      
      </form>
                </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleclick}className="btn btn-primary">
                update changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row md-3">
        <h2>your notes</h2>
        {notes.length === 0 && "no notes to display"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
}
