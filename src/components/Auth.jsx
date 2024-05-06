import React, { useContext, useEffect } from 'react'
import '../App.css'
import lamp from '../gallery/chandelier with green round lampshade.png'
import shape from '../gallery/Rectangle 1.png'
import manSitting from '../gallery/Rectangle.png'
import TodoForm from './TodoForm'
import { isSignInResponseContext } from '../contextAPI/ContextShare'

function Auth() {

//accessing context API
const {isSignInResponse , setIsSignInResponse} = useContext(isSignInResponseContext)

useEffect(()=>{
  if(localStorage.getItem("uid")){
    setIsSignInResponse(false)
  }
},[])
  
  return (
    <div id='Authentication'>

        {/* login button portion */}
       
          <TodoForm/>

       {/* image portion */}

       <div id='authImage'>           
           
             <img id='lampImg' src={lamp} alt="lampimg"/>      
           
             <img id='shapeImg' src={shape} alt="shapeImg"/>
            
            <img id='manImg' src={manSitting} alt="manImg"/>
                                 
       </div>


    </div>
  )
}

export default Auth