import React, { useContext, useEffect, useState } from 'react'
import './threeDot.css'
import { database } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { seeStatusResponseContext } from '../contextAPI/ContextShare'


function ThreeDotMenu({data}) {
 
//accessing contextAPI
const {seeStatusResponse , setSeeStatusResponse} = useContext(seeStatusResponseContext) 


const [isOpen, setIsOpen] = useState(false);


//creating collection in firebase firestore
const taskRef = collection(database,"task")

const removeRef = collection(database,"removed")


const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setTimeout(()=>{
        setIsOpen(false)
    },5000)
  };

  //function for updating completed key of task collection when clicking completed option
  const handleCompleted = async(e)=>{
    e.preventDefault()
    setIsOpen(false); // Close dropdown after selection

     const uid = localStorage.getItem("uid")
  
  const updateCompleted = doc(database,"task",data.id)
  await updateDoc(updateCompleted,{title:data.title,description:data.description,uid,completed:"true",favourite:data.favourite})

  setSeeStatusResponse(!seeStatusResponse) //for automatically seeing status when clicking

  }


  //function for updating favourite key of task collection when clicking favourite option
  const handleFavourite = async(e)=>{
    e.preventDefault()
    setIsOpen(false); // Close dropdown after selection

    const uid = localStorage.getItem("uid")

    const updateFavourite = doc(database,"task",data.id)
  await updateDoc(updateFavourite,{title:data.title,description:data.description,uid,completed:data.completed,favourite:"true"})

  setSeeStatusResponse(!seeStatusResponse) //for automatically seeing status when clicking

  }


// function for adding data to removed collection and removing from task collection
  const handleRemove = async(Id) => {
    
    setIsOpen(false); // Close dropdown after selection
    
    //adding data to removed collection
    const uid = localStorage.getItem("uid")
    await addDoc(removeRef,{title:data.title,description:data.description,uid})

    //removing from task collection
     const deleteVal = doc(database,"task",Id)
    await deleteDoc(deleteVal)

    setSeeStatusResponse(!seeStatusResponse) //for automatically seeing status when clicking

    
    
  };


    
  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        {/* Three small vertical dots */}
        <div style={{ width: '4px', height: '4px', backgroundColor: 'black',borderRadius:'50%' }}></div>
        <div style={{ width: '4px', height: '4px', backgroundColor: 'black', marginTop: '3px',borderRadius:'50%' }}></div>
        <div style={{ width: '4px', height: '4px', backgroundColor: 'black', marginTop: '3px',borderRadius:'50%' }}></div>
      </div>

      {isOpen && (
        <div className='shadow rounded'
          style={{
            position: 'absolute',
            top: '30px', // Adjust this value as needed
            left: '-40px',
            backgroundColor: 'white',
            zIndex: '999', // Ensure dropdown is above other content
            padding: '10px',
            width:'100px'
          }}
        >
          {/* Dropdown values */}
          <div className='dropValues text-center p-1 rounded' style={{ cursor: 'pointer' }} onClick={handleCompleted}>Completed</div>

          <div className='dropValues text-center p-1 rounded' style={{ cursor: 'pointer' }} onClick={handleFavourite}>Favourite</div>

          <div className='dropValues text-center p-1 rounded' style={{ cursor: 'pointer' }} onClick={()=>handleRemove(data.id)}>Delete</div>

        </div>
      )}
      
    </div>
  )
}

export default ThreeDotMenu