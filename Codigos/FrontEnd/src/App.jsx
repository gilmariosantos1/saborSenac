import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';


import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/inter';
import DuvidasSugestoes from './pages/DuvidasSugestoes';

// useRoutes();

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/DuvidasSugestoes' element={<DuvidasSugestoes />} />
      </Routes>
    </>
  )
}

export default App
