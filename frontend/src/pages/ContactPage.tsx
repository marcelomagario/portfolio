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
        <div className="contact-container">
            <h1>Contact Me</h1>
            <p>Feel free to reach out with any questions or collaboration opportunities!</p>

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

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            {status === 'success' && (
                <p style={{ color: 'green' }}>{responseMessage}</p>
            )}
            {status === 'error' && (
                <p style={{ color: 'red' }}>{responseMessage}</p>
            )}
        </div>
    );
};

export default ContactPage;