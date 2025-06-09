import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

const EditPostPage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Efeito para buscar os dados do post quando a página carrega
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Post não encontrado ou falha ao carregar.');
                }
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [id]); // Dependência no 'id' para buscar novamente se o ID na URL mudar

    // Função para lidar com o envio do formulário
    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Você não está autenticado.');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao atualizar o post.');
            }
            
            alert('Post atualizado com sucesso!');
            navigate('/admin/dashboard');

        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) return <p>Carregando post para edição...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="edit-post-container">
            <h1>Editar Post</h1>
            <form onSubmit={handleUpdate} className="contact-form">
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditPostPage;