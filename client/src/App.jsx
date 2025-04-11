import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';
import { JobProvider } from './context/JobContext';


function App() {
  return (
     <JobProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
    </JobProvider>
  );
}

export default App;


// import './App.css'
// import React from 'react';
// import Home from './Components/Home';
// import SignIn from './Components/auth/SignIn';
// import SignUp from './Components/auth/SignUp';

// function App() {
//   return (
//     <>
//      {/* <SignIn/>
//      <SignUp/> */}
//      <Home/>
//     </>  

//   )
// }

// export default App