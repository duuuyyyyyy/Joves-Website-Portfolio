import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <GlobalBackground />
      <Header />
      <div className="app-content-shell single-page">
        <Home />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
