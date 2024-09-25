import React ,{useEffect, useState}from 'react'
import Mainlayout from './layout/mainlayout'
import { Route, Routes } from 'react-router-dom'
import Company from './pages/company/company'
import Home from './pages/home'
import NotFoundPage from './pages/404'
import LoginPage from './pages/auth/login/login'
import { PrivateRoutesValidator } from './validators/validators'
import Customer from './pages/masters/customer/customer'
import Product from './pages/masters/product/product'
import VehicleType from './pages/masters/vehicle/vehicleType/vehicleType'
import Weighing from './pages/weighing/weighing'
import User from './pages/company/user/user'
import CameraView from './pages/camera/CameraView'
import VehicleNumber from './pages/masters/vehicle/vehicleNumber/vehicleNumber'


const App = () => {

  

  return (
    <>
   
      {/* <Mainlayout/> */}
      <Routes>
        <Route element={<PrivateRoutesValidator />}>
          <Route path='/' element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path='/company/create' element={<Company />} />
            <Route path='/customer/master' element={<Customer />} />
            <Route path='/material/master' element={<Product />} />
            <Route path='/vehicletype/master' element={<VehicleType />} />
            <Route path='/weighing/master' element={<Weighing />} />
            <Route path='/user/master' element={<User />} />
            <Route path='/vehicleno/master' element={<VehicleNumber />} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </>
  )
}

export default App


