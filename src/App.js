import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { useContext } from 'react';
import { isLoginResponseContext, isSignInResponseContext } from './contextAPI/ContextShare';

function App() {

//accessing contextAPI for protecting route
const {isLoginResponse , setIsLoginResponse} = useContext(isLoginResponseContext) 

const {isSignInResponse , setIsSignInResponse} = useContext(isSignInResponseContext)

  return (
    <div className="App">

      <Routes>
         
         <Route path='/' element={isSignInResponse?<Auth/>:<Dashboard/>}></Route>

         <Route path='/dashboard' element={isLoginResponse?<Dashboard/>:<Auth/>}></Route>

      </Routes>  
    
      

    </div>
  );
}

export default App;
