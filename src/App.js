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
    </div>
  );
}

export default App;