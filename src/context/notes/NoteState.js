import React, { useState } from 'react'
import NoteContext from './NoteContext'

export default function NoteState(props) {
  const host = "http://localhost:5001"
    const initialState = []
      const [notes, setNotes]= useState(initialState)
      
      const getnote = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const jresponse = await response.json();
       setNotes(jresponse)
    
    }
        const addnote = async (title, description, tag) => {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            });
            const jresponse = await response.json();
            setNotes(notes.concat(jresponse));
        
        }

      // delete notes from the notes collection
      const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
    
        });
        console.log(response)
        const newnotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newnotes);
      }


      // edit notes in the notes collection
      const editnote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const jresponse = response.json();
        console.log(jresponse); 
        let ultranotes = JSON.parse(JSON.stringify(notes));
          for(let index = 0; index < ultranotes.length; index++){
            const element = ultranotes[index];
            if(element._id === id){
                ultranotes[index].title = title;
                ultranotes[index].description = description;
                ultranotes[index].tag = tag;
                break;
            }
            
            
          }
          setNotes(ultranotes);
         
        
      }

    return (
        
        <NoteContext.Provider value={{notes, getnote, addnote, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>
        
    )
}

