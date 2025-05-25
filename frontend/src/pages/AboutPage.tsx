import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <h1>About Me</h1>
            <section className="bio-section">
                <img src="/profile_marcelo.jpg" alt="Marcelo Magario's Profile" className="profile-picture" /> {/* Certifique-se de colocar sua imagem em frontend/public */}
                <p>
                    Hello! I'm Marcelo Yukio Magario[cite: 1], a passionate Backend Developer with over 2 years of professional experience in RESTful APIs using Node.js, Express, and Python[cite: 1]. My journey in technology started with a degree in Systems Analysis and Development from FATEC-SP (2008-2012) [cite: 9] and has evolved into a focus on creating impactful digital solutions.
                </p>
                <p>
                    I primarily work with Node.js and TypeScript, leveraging frameworks like Express.js, and databases like PostgreSQL[cite: 3, 9]. I'm proficient in Docker and CI/CD[cite: 2], and also have experience with Python for process automation and web scraping using Selenium and BeautifulSoup[cite: 5, 9]. My experience extends to contributing to system stability, reducing support requests by 18%, and helping modernize legacy services. I'm also familiar with observability tools (DataDog, CloudWatch) and basic RabbitMQ usage.
                </p>
                <p>
                    I hold certifications as an AWS Certified Cloud Practitioner [cite: 9] and ITIL Foundation V3[cite: 2, 9], which strengthen my understanding of cloud fundamentals and IT service management best practices. After living 10 years abroad, I returned to Brazil with a renewed focus on tech, combining technical knowledge with adaptability, discipline, and resilience. I'm currently looking to take more ownership, work on scalable backend systems, and continue growing into a mid-level backend role. Always open to exchanging ideas.
                </p>
            </section>

            <section className="skills-section">
                <h2>My Skills</h2>
                <div className="skill-grid">
                    <div className="skill-item"><strong>Backend:</strong> Node.js, TypeScript, Express.js, Python, REST APIs [cite: 9]</div>
                    <div className="skill-item"><strong>Databases:</strong> PostgreSQL[cite: 9], Redis, ElasticSearch</div>
                    <div className="skill-item"><strong>Containerization:</strong> Docker [cite: 9]</div>
                    <div className="skill-item"><strong>Cloud:</strong> AWS (Certified Cloud Practitioner)[cite: 9], S3, CloudWatch</div>
                    <div className="skill-item"><strong>Tools & Concepts:</strong> Git[cite: 9], CI/CD[cite: 2], Selenium[cite: 9], BeautifulSoup[cite: 5], DataDog, RabbitMQ, ITIL[cite: 2], Microservices, Web Scraping, Process Automation, OOP, Design Patterns, Clean Code, Agile Methodologies</div>
                </div>
            </section>

            {/* Opcional: Adicionar uma seção de educação ou experiência profissional */}
        </div>
    );
};

export default AboutPage;