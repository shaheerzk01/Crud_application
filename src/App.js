import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Timeslot} from './Timeslot';
import {Course} from './Course';
import {Student} from './Student';
import {Room} from './Room'
import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App(){
  return(
    <Router>
      <div className='App Container'>
        <h3 className='d-flex justify-content-center m-3'>
          React JS Frontend
        </h3>
        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/home'>
                Home
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/timeslot'>
                Time Slot
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/course'>
                Course
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/Student'>
                Student
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/Room'>
                Room
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Timeslot' element={<Timeslot/>}/>
            <Route path='/Course' element={<Course/>}/>
            <Route path='/Student' element={<Student/>}/>
            <Route path='/Room' element={<Room/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;

