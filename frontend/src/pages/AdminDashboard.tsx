import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    created_at: string;
}

const AdminDashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/posts');
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data: Post[] = await response.json();
            setPosts(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (postId: number) => {
        if (!window.confirm('Tem certeza que deseja apagar este post? Esta ação é irreversível.')) {
            return;
        }

        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the post.');
            }

            // Remove o post da lista no estado para atualizar a UI instantaneamente
            setPosts(posts.filter(post => post.id !== postId));
            alert('Post apagado com sucesso!');

        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Gerencie seus posts abaixo.</p>
            <Link to="/admin/posts/new" className="btn btn-primary" style={{marginBottom: '2rem'}}>
                Criar Novo Post
            </Link>

            <div className="admin-posts-list">
                {posts.map(post => (
                    <div key={post.id} className="admin-post-item">
                        <span className="post-title">{post.title}</span>
                        <div className="post-actions">
                            <Link to={`/admin/posts/edit/${post.id}`} className="btn">Editar</Link>
                            <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Apagar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;