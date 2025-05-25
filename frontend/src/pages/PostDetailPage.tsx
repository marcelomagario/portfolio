import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Interface para garantir a tipagem do post
interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

const PostDetailPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // O hook useParams() pega o 'id' da URL (ex: /blog/5)
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            try {
                const response = await fetch(`http://localhost:3001/api/posts/${id}`);
                if (!response.ok) {
                    if(response.status === 404) {
                        throw new Error('Post not found');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const postData: Post = await response.json();
                setPost(postData);
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // O useEffect roda sempre que o 'id' na URL mudar

    if (loading) return <p>Loading post...</p>;
    
    if (error) {
         return (
            <div className="text-center">
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
        );
    }

    if (!post) return <p>Post not found.</p>; // Caso o post não seja encontrado

    return (
        <article className="post-detail-container">
            <h1>{post.title}</h1>
            <p className="post-meta" style={{color: 'var(--secondary-text-color)'}}>
                Published on: {new Date(post.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
            {/* Usamos dangerouslySetInnerHTML para renderizar o conteúdo HTML do post, se houver */}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <Link to="/blog" style={{marginTop: '2rem', display: 'inline-block'}}>
                &larr; Back to all posts
            </Link>
        </article>
    );
};

export default PostDetailPage;