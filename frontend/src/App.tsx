// App.tsx atualizado

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import PostDetailPage from './pages/PostDetailPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'; 
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />

            <div className="content">
                <Routes>
                    {/* Rotas Públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<PostDetailPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Rotas de Admin/CMS */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin/dashboard" element={<h2>Admin Dashboard</h2>} /> {/* Rota temporária */}

                    {/* Rota 404 */}
                    <Route path="*" element={<h2 style={{textAlign: 'center'}}>404 - Page Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;