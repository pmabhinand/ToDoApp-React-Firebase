import React, { useContext, useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { database } from '../firebase/config'
import { collection, getDocs, query, where } from "firebase/firestore";
import ThreeDotMenu from './ThreeDotMenu'
import { addTaskResponseContext, isLoginResponseContext, isSignInResponseContext, seeStatusResponseContext } from '../contextAPI/ContextShare'



function Dashboard() {

//accessing context API
const {addTaskResponse , setAddTaskResponse} = useContext(addTaskResponseContext) 

const {seeStatusResponse , setSeeStatusResponse} = useContext(seeStatusResponseContext)

const {isLoginResponse , setIsLoginResponse} = useContext(isLoginResponseContext)

const {isSignInResponse , setIsSignInResponse} = useContext(isSignInResponseContext)

  
const [myTask , setMyTask] = useState([]) //state for storing tasks from task collection for display

const [searchItem , setSearchItem] = useState("") //state for storing search box value

const [removeDotMenu , setRemoveDotMenu] = useState(true) //state for removing dot menu when seeing only deleted data from drop down box

const [showMarkOnly , setShowMarkOnly] = useState(false) //for only showing mark icon when selecting completed of drop down filter box

const [showLoveOnly , setShowLoveOnly] = useState(false) //for only showing love icon when selecting favourite of drop down filter box

const [storeSearchTask , setStoreSearchTask] = useState([]) //state for storing all the data of that particular user , when the user searching the tasks ("uid" == userId)




  const navigate = useNavigate()

  console.log(myTask); 
  
  

  //accessing  collections
  const taskRef = collection(database,"task")

  const removeRef = collection(database,"removed")


  //function for logout
  const handleLogout = ()=>{
    localStorage.clear()
    setIsLoginResponse(false)
    setIsSignInResponse(true)
    navigate('/')
  }

 //function for getting tasks from task collection
 const getData = async()=>{
   const userId = localStorage.getItem("uid") 

  if(searchItem){
    const q = query(taskRef, where("uid", "==", userId))
   const querySnapshot = await getDocs(q)
   
  setStoreSearchTask(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))) //storing all the data of the particular user for filtering

 setMyTask(storeSearchTask.filter((doc)=>doc.title.toLowerCase().includes(searchItem) || doc.description.toLowerCase().includes(searchItem))) //filtering data and storing it to state for only displaying the data matching with the search item
 
  }

  else{
    const q = query(taskRef, where("uid", "==", userId))
    const querySnapshot = await getDocs(q)
   setMyTask(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id})))   
  }  
 }

 useEffect(()=>{
  getData()
 },[searchItem,addTaskResponse,seeStatusResponse])



//function for getting data from collection based on drop down box value
const handleFilter = async(value)=>{
  const userId = localStorage.getItem("uid") 

  if(value==='Completed'){
      const q = query(taskRef, where("uid", "==", userId) && where("completed","==","true"))

      const querySnapshot = await getDocs(q)
      setMyTask(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))) 

      setShowLoveOnly(false) //for showing mark icon
      setShowMarkOnly(true) //for hiding love icon
      
      setRemoveDotMenu(false)

  }
  else if(value==='Favourite'){
    const q = query(taskRef, where("uid", "==", userId) && where("favourite","==","true") )

      const querySnapshot = await getDocs(q)
      setMyTask(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))) 

      setShowLoveOnly(true) //for hiding mark icon
      setShowMarkOnly(false) // for showing love icon 
      

      setRemoveDotMenu(false)
  }
  else{
    const q = query(removeRef, where("uid", "==", userId))

    const querySnapshot = await getDocs(q)
    setMyTask(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))) 
    
    setRemoveDotMenu(false)
    
  }
}

useEffect(()=>{
  if(localStorage.getItem("uid")){
    setIsLoginResponse(true)
  }
  else{
    setIsLoginResponse(false)
  }
},[])


  return (
    <div id='dashBoard'>

      {/* form */}

      <TodoForm IsLogin={true}/>

{/* this will only see in small devices for navigating to Todo List */}
      <div id='seeTask'>
        <a href="#todoList">See My Tasks</a>
      </div>

      {/* Line seperation */}

      <div id='Line' className='mt-5'>

      </div>

      

      {/* Todo List */}
      
      <div id='todoList'>

        <button onClick={handleLogout} id='logOutbtn' className='btn btn-danger m-2'>Logout</button>

         <h3 className='mt-5 ms-5 fw-bold'>TODO LIST</h3>

        
        <div className='d-flex justify-content-between m-5'>
                  
          <input onChange={(e)=>setSearchItem(e.target.value.toLowerCase())} className='p-1 form-control' id='searchField' type="text" placeholder='Search' />

         {/* drop down box */}      
          <select onChange={(e)=>handleFilter(e.target.value)} style={{border:'1px solid lightGrey'}} className='ps-1 pe-1'>
             <option value="" disabled selected hidden>Filter By</option>
             <option value="Completed">Completed</option>
             <option value="Favourite">Favourite</option>
             <option value="Deleted">Deleted</option>
           </select> 
        
        </div>
      
      <Row className='m-5 pt-5'>
        {
          myTask.length>0?myTask.map((item)=>(
         <Col lg={12}>
           <div className='d-flex justify-content-between'>
              <div>
                <h5 className='fw-bold'>{item.title}</h5>
                <p>{item.description}</p>
              </div>

          <div className='w-25 d-flex justify-content-between'>
            {
              item.completed?
              <i class="fa fa-check text-success" id={showLoveOnly&&'hideMarkIcon'}></i>
              :
              <i style={{visibility:'hidden'}} class="fa fa-check text-success"></i>
            }
              
            {
              item.favourite&&
              <i class="fa-solid fa-heart text-danger" id={showMarkOnly&&'hideLoveIcon'}></i>
            }
            </div>  

             {
              removeDotMenu?
              <ThreeDotMenu data={item}/>
              :
              null
             }
              
           </div>
           
          
           <hr/>
         </Col>
          ))  :
          <h5 className='text-center' style={{color:'lightgray'}}>Your tasks will show here</h5>

         }
      </Row>

         

      </div>


    </div>
  )
}

export default Dashboard