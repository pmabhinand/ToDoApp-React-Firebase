import React, { useContext, useState } from 'react'
import '../App.css'
import logo from '../gallery/Group.png'
import googleIcon from '../gallery/grommet-icons_google.png'
import {auth,provider} from "../firebase/config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { database } from '../firebase/config'
import { addDoc, collection } from 'firebase/firestore'
import { addTaskResponseContext, isLoginResponseContext } from '../contextAPI/ContextShare'



function TodoForm({IsLogin}) {

  //accessing context API
  const {addTaskResponse , setAddTaskResponse} = useContext(addTaskResponseContext)

  const {isLoginResponse , setIsLoginResponse} = useContext(isLoginResponseContext)

  //state for storing tasks from input box
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  
  const navigate = useNavigate()

  //creating collection in firebase firestore
  const taskRef = collection(database,"task")

/* function for Login using Google SSO */
  const handleLogin = ()=>{
    signInWithPopup(auth,provider).then((data)=>{
        localStorage.setItem("email",data.user.email)
        localStorage.setItem("uid",data.user.uid)
        setIsLoginResponse(true)
        navigate('/dashboard')
    })
  }

  //function for adding tasks to task collection
  const handleAdd = async(e)=>{
     e.preventDefault()

     if(title && description){
      const uid = localStorage.getItem("uid")

      await addDoc(taskRef,{title,description,uid,completed:"",favourite:""})

      alert('Task added successfully')

      setTitle("")
      setDescription("")
    
      setAddTaskResponse(true) //for automatically seeing data when adding   
      
     }
     else{
      alert('Please complete the form')
     }
    
  }


  return (
    <>
      
      <div id='authButton'>

           <img className='ms-5 mt-5' src={logo} alt="logo" style={{width:'25px'}}/>

           <div id='loremDiv' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'70vh'}}>
              <h3 className='text-center fw-bold'>{IsLogin?'TODO':'LOGIN'}</h3>
              <p id='lorem' className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos dolorem, in commodi, voluptatem vel ab libero tenetur, eveniet qui necessitatibus optio quod facilis. Nulla tempore modi distinctio recusandae placeat. Lorem ipsum dolor sit bhy.</p>

            {
                IsLogin?
            
              <form className='mt-2'>
                <input type="text" className='form-control' placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>

                <input type="text" className='form-control mt-3' placeholder='Description' onChange={(e)=>setDescription(e.target.value)} value={description}/>

                <button onClick={handleAdd} className='mt-5 w-100 pt-2 pb-2 bg-primary text-light' style={{border:'none'}}>Add</button>

              </form> 
              
              :

              <div id='loginButton' onClick={handleLogin} className='mt-4'>
                  
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'20%'}}>

                  <div className='bg-light rounded' style={{display:'flex',justifyContent:'center',alignItems:'center',width:'80%',height:'80%'}}>
                    <img src={googleIcon} alt="googleIcon"  style={{width:'55%',height:'55%'}}/>
                  </div>

                  </div>

                  <div className='w-100' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <h5 className='text-light'>Sign in using Google</h5> 
                  </div>                 

              </div> 
                

            }
       

           </div>
           
       </div>

    </>
  )
}

export default TodoForm