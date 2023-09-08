import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Availablity from '../components/User Dashboard/UserAvailablity';
import {Home} from '../components/User Dashboard/UserHome';
const UserNavRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/avaliablity' element={<Availablity/>}/>
        </Routes>
    </div>
  )
}

export default UserNavRoutes