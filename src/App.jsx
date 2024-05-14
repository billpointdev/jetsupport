import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
import Home from "./pages/landing-pages/home";
import ErrorPage from "./pages/landing-pages/error-page";
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="*" element={<ErrorPage />} />
    </Routes>
   
  </BrowserRouter>
  )
}

export default App