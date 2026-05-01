import './css/App.css'
import Favourites from './pages/Favourites.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext.jsx'
import NavBar from './components/NavBar.jsx'

function App() {

  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </main>
      </MovieProvider>

    </>
  )
}

export default App
