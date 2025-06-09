import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

interface Tag {
    id: number;
    name: string;
}

const CreatePostPage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Busca as tags disponíveis da API quando o componente é montado
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/tags');
                if (!response.ok) {
                    throw new Error('Failed to fetch tags.');
                }
                const tags: Tag[] = await response.json();
                setAvailableTags(tags);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchTags();
    }, []);

    // Adiciona ou remove uma tag da lista de tags selecionadas
    const handleTagChange = (tagId: number) => {
        setSelectedTags(prevSelectedTags =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter(id => id !== tagId) // Remove a tag
                : [...prevSelectedTags, tagId] // Adiciona a tag
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    tagIds: selectedTags // Envia o array de IDs das tags
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao criar o post.');
            }

            alert('Post criado com sucesso!');
            navigate('/admin/dashboard');

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="create-post-container">
            <h1>Criar Novo Post</h1>
            <form onSubmit={handleSubmit} className="contact-form">
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

                <div className="form-group">
                    <label>Tags:</label>
                    <div className="tags-checkbox-container">
                        {availableTags.map(tag => (
                            <div key={tag.id} className="tag-checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`tag-${tag.id}`}
                                    value={tag.id}
                                    onChange={() => handleTagChange(tag.id)}
                                />
                                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Publicar Post</button>
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    );
};

export default CreatePostPage;