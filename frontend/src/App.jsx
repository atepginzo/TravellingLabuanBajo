import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DiscoveryDetail from './pages/DiscoveryDetail';
import ArticleDetail from './pages/ArticleDetail';
import Booking from './pages/Booking';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-deep-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discovery/:slug" element={<DiscoveryDetail />} />
            <Route path="/artikel/:slug" element={<ArticleDetail />} />
            <Route path="/pesan/:id" element={<Booking />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
