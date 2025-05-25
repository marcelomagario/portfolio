// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha no login. Verifique suas credenciais.');
            }

            // Salva o token no localStorage para uso futuro
            localStorage.setItem('authToken', data.token);
            
            alert('Login bem-sucedido!'); // Alerta temporário de sucesso

            // Redireciona o usuário para um futuro painel de admin
            navigate('/admin/dashboard'); 

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>CMS Login</h1>
            <p>Acesse o painel para gerenciar o conteúdo do blog.</p>
            {/* Reutilizamos as classes do formulário de contato para manter o estilo */}
            <form onSubmit={handleLogin} className="contact-form" style={{maxWidth: '500px', margin: '2rem auto'}}>
                <div className="form-group">
                    <label htmlFor="username">Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;