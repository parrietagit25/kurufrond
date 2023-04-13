import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import UpdateUser from '../pages/UpdateUser'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={ <LoginPage /> }/>
        <Route path='updateUser' element={ <UpdateUser /> }/>

        <Route path='/*' element={ <Navigate to="/auth/login"/> } />
    </Routes>
  )
}

export default AuthRoutes
