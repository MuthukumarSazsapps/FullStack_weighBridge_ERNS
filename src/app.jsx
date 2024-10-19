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
   
        <Route path='owner/customer/master' element={<Customer />} /> 
        <Route path='owner/material/master' element={<Product />} />
        <Route path='owner/vehicletype/master' element={<VehicleType />} />
        <Route path='owner/weighing/master' element={<Weighing />} />
        <Route path='owner/user/master' element={<User />} />
        <Route path='owner/vehicleno/master' element={<VehicleNumber />} />
      </Route>


      <Route element={<AdminRoutesValidator />}>
        <Route path='admin/company/create' element={<Company />} />
        <Route path='admin/customer/master' element={<Customer />} />
        <Route path='admin/material/master' element={<Product />} />
        <Route path='admin/vehicletype/master' element={<VehicleType />} />
        <Route path='admin/weighing/master' element={<Weighing />} />
        <Route path='admin/user/master' element={<User />} />
        <Route path='admin/vehicleno/master' element={<VehicleNumber />} />
      </Route>

      <Route element={<UserRoutesValidator />}>
        <Route path='user/customer/master' element={<Customer />} /> 
        <Route path='user/material/master' element={<Product />} />
        <Route path='user/vehicletype/master' element={<VehicleType />} />
        <Route path='user/weighing/master' element={<Weighing />} />
        {/* <Route path='user/users/master' element={<User />} /> */}
        <Route path='user/vehicleno/master' element={<VehicleNumber />} />
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


