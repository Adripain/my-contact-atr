import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Contacts from './pages/Contacts';

function App() {
  const email = localStorage.getItem("email");

  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <nav>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/contacts">Contacts</Link>
          </nav>
          <div>
            {email ? `Connecté : ${email}` : "Non connecté"}
          </div>
        </header>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
