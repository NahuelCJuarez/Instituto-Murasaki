import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/home/home";
import Login from "./views/login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import './app.css'
import Register from './views/register/Register';
import Discord from './views/discord/Discord';
import Alumno from './views/alumno/Alumno';
import Admin from './admin/Admin';
import ProtectedRoute from './components/protectedroute/protectedroute';


const App: React.FC = () => {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/discord' element={<Discord />} />
        <Route path='/alumno' element={<Alumno />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
