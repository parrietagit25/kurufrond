import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../../hooks'
import ConfigComisiones from '../pages/comercial/ConfigComisiones'
import DowloadComisionesPage from '../pages/comercial/DowloadComisionesPage'
import PanapassPage from '../pages/finanzas/PanapassPage'
import HomePage from '../pages/home/HomePage'
import AdmisionPage from '../pages/rrhh/AdmisionPage'
import DownloadComisionesPage from '../pages/rrhh/DownloadComisionesPage'
import UploadComisionPage from '../pages/rrhh/UploadComisionesPage'

const KurumaRoutes = () => {

  return (
    <Routes>
      
      {/*Inicio Pages*/}
      <Route path='/home' element={ <HomePage/> } />

      {/*Finanzas Pages*/}
      <Route path='/finanzas/panapass' element={ <PanapassPage/> } />

      {/*RRHH Pages*/}
      <Route path='/rrhh/uploadComisiones' element={ <UploadComisionPage/> } />
      <Route path='/rrhh/dowloadComisiones' element={ <DownloadComisionesPage/> } />
      <Route path='/rrhh/admision' element={ <AdmisionPage/> } />

      {/*Comercial Pages*/}
      <Route path='/comercial/dowloadComisiones' element={ <DowloadComisionesPage/> } />
      <Route path='/comercial/configComisiones' element={ <ConfigComisiones/> } />

      <Route path='/*' element={ <Navigate to="/home"/> } />

    </Routes>
  )
}

export default KurumaRoutes
