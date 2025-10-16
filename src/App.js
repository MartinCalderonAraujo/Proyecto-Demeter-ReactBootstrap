import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import BarraNavegacion from './componentes/BarraNavegacion';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';


function App() {
  return (
    <>
      <Router>
        <BarraNavegacion />
        <Routes>
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/Nosotros' element={<Nosotros />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
