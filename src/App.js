import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login.js'
import Home from './pages/home/Home.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <footer>
        <p>©2025 SystemLab Web</p>
      </footer>
    </div>

  );
}

export default App;