import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/home/home";
import Login from "./views/login/Login";
import Navbar from "./components/Navbar/Navbar";
import './app.css'


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
