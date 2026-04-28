import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Sugestoes from './pages/Sugestoes';
import EditarProduto from "./pages/EditarProduto";       
import PainelAtentende from './pages/painelAtendente';    
import CadastrarProduto from './pages/CadastrarProduto';  

import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';
import Consultapedido from './pages/consultapedido';
import ConfirmarPedido from './pages/ConfirmarPedido';
import '@fontsource/sanchez';
import ControleDeEstoque from './pages/ControleDeEstoque';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sugestoes' element={<Sugestoes />} />
        
        {/* Rotas da sua branch */}
        <Route path='/EditarProduto' element={<EditarProduto />} />
        
        {/* Rotas da main */}
        <Route path='/consultapedido' element={<Consultapedido />} />
        <Route path='/confirmarpedido' element={<ConfirmarPedido />} />
        <Route path='/painelAtendente' element={<PainelAtentende />} />
        <Route path='/controledeestoque' element={<ControleDeEstoque />} />
        <Route path='/cadastrar-produto' element={<CadastrarProduto />} />
      </Routes>
    </>
  )
}

export default App;
