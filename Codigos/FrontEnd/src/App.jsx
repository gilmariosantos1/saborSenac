import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Sugestoes from './pages/Sugestoes';
import PainelAtentende from './pages/painelAtendente';


import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';
import Consultapedido from './pages/consultapedido';
import ConfirmarPedido from './pages/ConfirmarPedido';
import '@fontsource/sanchez';
import ControleDeEstoque from './pages/ControleDeEstoque';


// useRoutes();

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sugestoes' element={<Sugestoes />} />
          <Route path='/consultapedido' element={<Consultapedido />} />
          <Route path='/confirmarpedido' element={<ConfirmarPedido />} />
          <Route path='/painelAtendente' element={<PainelAtentende />} />
          <Route path='/controledeestoque' element={<ControleDeEstoque />} />
      </Routes>
    </>
  )
}

export default App
