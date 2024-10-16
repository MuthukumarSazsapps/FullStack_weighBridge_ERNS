import React ,{useEffect, useState}from 'react'
import Mainlayout from './layout/mainlayout'
import { Route, Routes } from 'react-router-dom'
import Company from './pages/company/company'
import Home from './pages/home'
import NotFoundPage from './pages/404'
import LoginPage from './pages/auth/login/login'
import { AdminRoutesValidator, PrivateRoutesValidator, SubscriberRoutesValidator, UserRoutesValidator } from './validators/validators'
import Customer from './pages/masters/customer/customer'
import Product from './pages/masters/product/product'
import VehicleType from './pages/masters/vehicle/vehicleType/vehicleType'
import Weighing from './pages/weighing/weighing'
import User from './pages/masters/user/user'
import CameraView from './pages/camera/CameraView'
import VehicleNumber from './pages/masters/vehicle/vehicleNumber/vehicleNumber'


const App = () => {

  

  return (
    <>
   
      {/* <Mainlayout/> */}
      {/* <Routes>
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

      </Routes> */}


<Routes>
  {/* Private routes that require authentication */}
  <Route element={<PrivateRoutesValidator />}>
    <Route path='/' element={<Mainlayout />}>
      <Route index element={<Home />} />

      {/* Admin Routes */}
      
      {/* Subscriber Routes */}
      <Route element={<SubscriberRoutesValidator />}>
   
        <Route path='o/customer/master' element={<Customer />} /> 
        <Route path='o/material/master' element={<Product />} />
        <Route path='o/vehicletype/master' element={<VehicleType />} />
        <Route path='o/weighing/master' element={<Weighing />} />
        <Route path='o/user/master' element={<User />} />
        <Route path='o/vehicleno/master' element={<VehicleNumber />} />
      </Route>


      <Route element={<AdminRoutesValidator />}>
        <Route path='a/company/create' element={<Company />} />
        <Route path='a/customer/master' element={<Customer />} />
        <Route path='a/material/master' element={<Product />} />
        <Route path='a/vehicletype/master' element={<VehicleType />} />
        <Route path='a/weighing/master' element={<Weighing />} />
        <Route path='a/user/master' element={<User />} />
        <Route path='a/vehicleno/master' element={<VehicleNumber />} />
      </Route>

      <Route element={<UserRoutesValidator />}>
        <Route path='u/customer/master' element={<Customer />} /> 
        <Route path='u/material/master' element={<Product />} />
        <Route path='u/vehicletype/master' element={<VehicleType />} />
        <Route path='u/weighing/master' element={<Weighing />} />
        {/* <Route path='u/users/master' element={<User />} /> */}
        <Route path='u/vehicleno/master' element={<VehicleNumber />} />
      </Route>

    </Route>
  </Route>

  {/* Public Routes */}
  <Route path='/login' element={<LoginPage />} />
  <Route path='*' element={<NotFoundPage />} />
</Routes>

    </>
  )
}

export default App


