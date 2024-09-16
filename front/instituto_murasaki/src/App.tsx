import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/home/home";
import Login from "./views/login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import './app.css'
import Register from './views/register/Register';
import Discord from './views/discord/Discord';
import Alumno from './views/alumno/Alumno';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/discord' element={<Discord />} />
        <Route path='/alumno' element={<Alumno />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
