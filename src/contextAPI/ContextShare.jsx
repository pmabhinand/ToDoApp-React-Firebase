import React, { createContext, useState } from 'react'

//context for automatically seeing task when adding
export const addTaskResponseContext = createContext()

//context for automatically seeing status(completed,favoutite ....) when selecting from 3 dot menu
export const seeStatusResponseContext = createContext()

//context for protecting Route
export const isLoginResponseContext = createContext()

//context for not going back to sign in page from dashboard
export const isSignInResponseContext = createContext()


function ContextShare({children}) {

//children is a predefined props used to share data between all components
    // data to share
const [addTaskResponse , setAddTaskResponse]  = useState(false) 

const [seeStatusResponse , setSeeStatusResponse] = useState(false)

const [isLoginResponse , setIsLoginResponse] = useState(true)

const [isSignInResponse , setIsSignInResponse] = useState(true)


  return (
    <>
    
    <addTaskResponseContext.Provider value={{addTaskResponse , setAddTaskResponse}}>
        <seeStatusResponseContext.Provider value={{seeStatusResponse , setSeeStatusResponse}}>
           <isLoginResponseContext.Provider value={{isLoginResponse , setIsLoginResponse}}>
            <isSignInResponseContext.Provider value={{isSignInResponse , setIsSignInResponse}}>
       {children}
       </isSignInResponseContext.Provider>
       </isLoginResponseContext.Provider> 
       </seeStatusResponseContext.Provider>
    </addTaskResponseContext.Provider>
    
    </>
  )
}

export default ContextShare