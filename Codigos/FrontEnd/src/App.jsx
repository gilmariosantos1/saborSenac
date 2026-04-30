import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Sugestoes from './pages/Sugestoes';
import EditarUsuario from './pages/EditarCadastroUsuario';
import CadastroUsuario from './pages/CadastroUsuario';

import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';

// useRoutes();

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route path='/sugestoes' element={<Sugestoes />} />
          <Route path='/editar-usuario' element={<EditarUsuario />} />
      </Routes>
    </>
  )
}

export default App
