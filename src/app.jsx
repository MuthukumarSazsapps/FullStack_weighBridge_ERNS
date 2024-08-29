import React ,{useEffect}from 'react'
import Mainlayout from './layout/mainlayout'
import { Route, Routes } from 'react-router-dom'
import Company from './pages/company/company'
import Home from './pages/home'
import NotFoundPage from './pages/404'
import LoginPage from './pages/auth/login/login'
import { PrivateRoutesValidator } from './validators/validators'
import Customer from './pages/customer/customer'
import Product from './pages/product/product'
import Vehicle from './pages/vehicle/vehicle'
import Weighing from './pages/weighing/weighing'


const App = () => {

  return (
    <>
      {/* <Mainlayout/> */}
      <Routes>
        <Route element={<PrivateRoutesValidator />}>
          <Route path='/' element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path='/company/create' element={<Company />} />
            <Route path='/company/master' element={<Customer />} />
            <Route path='/material/master' element={<Product />} />
            <Route path='/vehicletype/master' element={<Vehicle />} />
            <Route path='/weighing/master' element={<Weighing />} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </>
  )
}

export default App


