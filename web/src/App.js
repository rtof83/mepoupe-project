import React from 'react';
import Home from './pages/home';
import Media from './pages/media';
import CEP from './pages/cep';
import Footer from './components/footer';
import Header from './components/header';

// import IdContext from './contexts/Contexts';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  // const [ id, setId ] = useState('');

  return (
    // <IdContext.Provider value={[ id, setId ]}>

      <Router>
        <Header />
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/media' element={<Media />} />
            <Route path='/cep' element={<CEP />} />
          </Routes>
        <Footer />
      </Router>

    // </IdContext.Provider>
  )
};

export default App;
