import React, { useState } from 'react';
import type { FormEvent } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 

        setStatus('loading');
        setResponseMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setResponseMessage(data.message || 'Your message has been sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
                setResponseMessage(data.message || 'Failed to send message. Please try again.');
            }
        } catch (err: any) {
            console.error("Error sending contact form:", err);
            setStatus('error');
            setResponseMessage('An unexpected error occurred. Please check your network connection.');
        }
    };

    return (
        <div className="contact-page-container">
            <h1>Contact Me</h1>
            
            <p>
                If you have a project in mind, want to discuss a potential role, or just want to talk tech, 
                please don't hesitate to reach out. Fill this form below to get in touch with me or find 
                me through my professional networks.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            {status !== 'idle' && responseMessage && (
                 <div className={`status-message ${status}`}>
                    <p>{responseMessage}</p>
                </div>
            )}

            <div className="professional-networks">
                <h2>Or find me on my networks</h2>
                <ul>
                    <li>📧 Email: <a href="mailto:marcelomagario@gmail.com">marcelomagario@gmail.com</a></li>
                    <li>🔗 LinkedIn: <a href="https://www.linkedin.com/in/marcelomagario" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/marcelomagario/</a></li>
                    <li>💻 GitHub: <a href="https://github.com/marcelomagario" target="_blank" rel="noopener noreferrer">https://github.com/marcelomagario</a></li>
                </ul>
            </div>
        </div>
    );
};

export default ContactPage;