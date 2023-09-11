import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import { useState } from 'react';

function App() {

  const [loginUser, setLoginUser] = useState({
    
  })
  // console.log("app.js=> loginUser" , loginUser);

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          loginUser && loginUser._id ? <Welcome loginUser={loginUser} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
        } />
        <Route path='/signup' element={<Signup />} > </Route>
        <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
