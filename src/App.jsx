import './App.css'
import { Route, Routes } from 'react-router-dom'
import Details from './pages/details'
import Favourites from './pages/favourites'
import Home from './pages/home'
import NavBar from './components/nav-bar'
function App() {
  return (
    <div className='min-h-screen p-10 text-lg '>
      <NavBar />
      <div className='container border-2 border-[#f8f8f8] p-6 rounded-lg mx-auto'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
