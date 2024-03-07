import './App.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import MenuContextComp from './context/menuContext'
import OrderContextComp from './context/orderContext'
import Register from './pages/register'
import AuthContextComp from './context/authContext'

function App() {

  return (
    <AuthContextComp>
      <MenuContextComp>
        <OrderContextComp>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </BrowserRouter>
        </OrderContextComp>
      </MenuContextComp>
    </AuthContextComp>
  )
}

export default App
