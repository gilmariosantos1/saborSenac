import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Sugestoes from './pages/Sugestoes';


import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';
import Consultapedido from './pages/consultapedido';

// useRoutes();

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sugestoes' element={<Sugestoes />} />
          <Route path='/consultapedido' element={<Consultapedido />} />
      </Routes>
    </>
  )
}

export default App
