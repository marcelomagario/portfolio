import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

const BlogPreview: React.FC = () => {
    const [latestPosts, setLatestPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const posts: Post[] = await response.json();
                
                const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setLatestPosts(sortedPosts.slice(0, 3));

            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading latest posts...</p>;
    if (error) return <p>Error loading posts. Please try again later.</p>;

    return (
        <div className="blog-preview-container">
            <h2>Latest From The Blog</h2>
            {latestPosts.length > 0 ? (
                latestPosts.map(post => (
                    <article key={post.id} className="blog-post-summary">
                        <h3>
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p>{post.content.substring(0, 200)}...</p>
                    </article>
                ))
            ) : (
                <p>No recent posts available.</p>
            )}
             <div className="read-more-container">
                <Link to="/blog" className="btn btn-primary">Read More</Link>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <section className="about-section">
                <h1>Software Engineer | Backend Development & Cloud Infrastructure</h1>
                <p>
                    I am a Software Engineer passionate about the entire development lifecycle, from writing efficient backend code (Node.js, TypeScript) to deploying and scaling it on robust cloud infrastructure (AWS, Docker). My unique strength lies in bridging development and operations, a skill that enabled me to enhance system observability and directly contribute to an 18% reduction in support requests.
                </p>
                <p>
                    With certifications in AWS and ITIL, I focus on building solutions that are not only well-coded but also operationally excellent. My goal is to leverage this holistic view to create resilient and high-performing software.
                </p>
            </section>

            <BlogPreview />
        </div>
    );
};

export default HomePage;