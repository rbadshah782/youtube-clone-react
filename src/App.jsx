
import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Videos from '../src/Pages/Videos/Videos'
import Sidebar from './Components/Sidebar/Sidebar'
const App = () => {

  const [sidebar, setSidebar] = useState(true);
  const [category, setCategory] = useState(0);

  return (
    
    <div>
      <Navbar setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/video/:categoryId/:videoId'  element={<Videos/>} />
        
      </Routes>

    </div>
  )
}

export default App
