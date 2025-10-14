import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './pages/Navbar';
import Catalogo from './pages/Catalogo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Descripción</h1>
          Learn React
        </a>

        <Navbar />
        <Router>
          <Routes>
            
            <Route path='/catalogo' element={<Catalogo />} />
          </Routes>
        </Router>

      </header>
    </div>
  );
}

export default App;
