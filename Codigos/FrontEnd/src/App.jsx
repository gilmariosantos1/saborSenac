import { Routes, Route } from 'react-router-dom';
import './App.css';

// páginas
import Home from './pages/Home';
import Sugestoes from './pages/Sugestoes';
import Login from './pages/Login';
import EditarProduto from "./pages/EditarProduto";
import PainelAtentende from './pages/painelAtendente';
import CadastrarProduto from './pages/CadastrarProduto';
import Agendamento from './pages/Agendamento';
import Consultapedido from './pages/consultapedido';
import ConfirmarPedido from './pages/ConfirmarPedido';
import ControleDeEstoque from './pages/ControleDeEstoque';
import AdicionarProduto from './pages/Adicionarproduto';

// fontes
import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';
import '@fontsource/sanchez';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sugestoes' element={<Sugestoes />} />
      <Route path='/login' element={<Login />} />
      <Route path='/agendamento' element={<Agendamento />} />

      <Route path='/editarproduto' element={<EditarProduto />} />
      <Route path='/adicionarproduto' element={<AdicionarProduto />} />
      <Route path='/cadastrar-produto' element={<CadastrarProduto />} />

      <Route path='/consultapedido' element={<Consultapedido />} />
      <Route path='/confirmarpedido' element={<ConfirmarPedido />} />

      <Route path='/painelatendente' element={<PainelAtentende />} />
      <Route path='/controledeestoque' element={<ControleDeEstoque />} />
    </Routes>
  );
}

export default App;