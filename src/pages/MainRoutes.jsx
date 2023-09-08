import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Calendar2 from '../components/Calendar/Calendar2';
import { Home } from './Home';
import {Home as UserHome} from '../components/User Dashboard/UserHome';
import EventTypes from '../components/User Dashboard/EventTypes';
import EventForm from '../components/User Dashboard/EventForm';
export const MainRoutes = () => {
  return (
    <div>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/userevent/userhome' element={<UserHome/>}/>
     <Route path='/userevent/userhome/yourevent' element={<EventTypes/>}/>
     <Route path='/userevent/userhome/eventforms' element={<EventForm/>}/>
     <Route path='/userevent/userhome/calendar' element={<Calendar2/>}/>
   </Routes>    
    </div>
  )
}
