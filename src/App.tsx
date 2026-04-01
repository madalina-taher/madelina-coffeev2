import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import MenuPage from './pages/MenuPage'; 

export default function App() {
  return (
    <Router basename="/madelina-coffeev2">
      <div className="min-h-screen flex flex-col selection:bg-madelina-terracotta selection:text-white">
        <Routes>
          {/* Admin route: nkhalliwah feragh bech yemchi lel public/admin direct */}
          <Route path="/admin" element={null} />
          
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}