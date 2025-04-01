import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />}></Route>
      <Route path='/' exact element={<Login />}></Route>
      <Route path='/signup' exact element={<SignUp />}></Route>
    </Routes>
  </Router>
)

function App() {
  return (
    <div>
      {routes}
    </div>
  )
} 

export default App
