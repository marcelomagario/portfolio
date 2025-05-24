import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    tags?: { id: number; name: string }[]; 
}

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                setError("No post ID provided.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Post not found.');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (err: any) {
                console.error("Error fetching post:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // O useEffect roda novamente se o 'id' na URL mudar

    if (loading) {
        return <div>Loading post details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
            {post.updated_at && (
                <p>Last updated: {new Date(post.updated_at).toLocaleDateString()}</p>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div> {/* Para manter quebras de linha */}
            {post.tags && post.tags.length > 0 && (
                <p>Tags: {post.tags.map((tag) => tag.name).join(', ')}</p>
            )}
        </div>
    );
};

export default PostDetailPage;