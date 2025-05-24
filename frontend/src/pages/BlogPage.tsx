import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err: any) {
                console.error("Error fetching posts:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>My Blog</h1>
            {posts.length === 0 ? (
                <p>No posts found. Check back later!</p>
            ) : (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <h2>
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h2>
                                <p>{post.content.substring(0, 150)}...</p> {/* Exibe um resumo do conteúdo */}
                                {post.tags && post.tags.length > 0 && (
                                    <p>Tags: {post.tags.map((tag: any) => tag.name).join(', ')}</p>
                                )}
                            </li>
                        ))}
                    </ul>
            )}
        </div>
    );
};

export default BlogPage;