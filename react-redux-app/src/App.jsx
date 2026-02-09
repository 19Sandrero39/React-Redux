import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Router>
      <Header/>
      <Navbar/>

      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/about"
          element={<About/>}
        />
      </Routes>
    </Router>
  )
}

export default App
