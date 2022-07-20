
import './styles.css'
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

import PublicRoute from 'components/PublicRoute'
import ProtectedRoute from 'components/ProtectedRoute'

import PublicHome from 'pages/public/publicHome'
import ProtectedHome from 'pages/protected/protectedHome'
import SignIn from 'pages/signIn'

const App = () => {
  return (
    <Router>

      <Routes>        
        <Route exact path="/signin" element={<SignIn />} />                    
        <Route 
          path="/" 
          element={
            <ProtectedRoute element={<ProtectedHome />} />
          }            
          />

      </Routes>

    </Router>
  )
};

export default App