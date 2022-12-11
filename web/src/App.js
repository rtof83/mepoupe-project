import React from 'react';
import Home from './pages/home';
import Media from './pages/media';
import LogMedia from './lists/logMedia';
import CEP from './pages/cep';
import LogCEP from './lists/logCEP';
import Footer from './components/footer';
import Header from './components/header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
          <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/media' element={<Media />} />
          <Route path='/cep' element={<CEP />} />
          <Route path='/logMedia' element={<LogMedia />} />
          <Route path='/logCEP' element={<LogCEP />} />
        </Routes>
      <Footer />
    </Router>
  )
};

export default App;
