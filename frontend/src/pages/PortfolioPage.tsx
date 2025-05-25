import React from 'react';

const PortfolioPage: React.FC = () => {
    // Exemplo de dados de projetos
    const projects = [
        {
            id: 1,
            title: 'Personal Portfolio & Blog (This Project)',
            description: 'A full-stack project featuring a Node.js/TypeScript backend API, PostgreSQL database, AWS SES for email, and a React.js frontend. Includes a blog and a basic CMS.',
            technologies: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'React.js', 'AWS SES'],
            link: 'https://github.com/marcelomagario/your-portfolio-repo', // Substitua pelo link real do seu repositório deste projeto
            image: '/placeholder_project_1.jpg' // Substitua por uma imagem do seu projeto
        },
        {
            id: 2,
            title: 'Dockerized Python Application (DevOps Portfolio)',
            description: 'Containerized a Python application with Docker, published on Docker Hub with comprehensive documentation. This project showcases practical DevOps skills and containerization best practices.',
            technologies: ['Python', 'Docker', 'Docker Hub'],
            link: 'https://github.com/marcelomagario/devops-docker', // Link para o seu projeto pessoal [cite: 10]
            image: '/placeholder_project_2.jpg' // Substitua por uma imagem do seu projeto
        },
        {
            id: 3,
            title: 'Legacy Microservice Modernization',
            description: 'Implemented Docker in a legacy microservice and developed new endpoints in TypeScript, contributing to the modernization and stability of existing systems at MZ Group.',
            technologies: ['Node.js', 'TypeScript', 'Docker', 'Microservices', 'PostgreSQL'],
            link: 'https://github.com/marcelomagario?tab=repositories', // Exemplo: link para seu perfil do GitHub ou se houver um repositório público
            image: '/placeholder_project_3.jpg' // Substitua por uma imagem do seu projeto
        },
        {
            id: 4,
            title: 'File Migration Automation to S3',
            description: 'Automated file migration to S3 using Python crawlers (Selenium & BeautifulSoup), improving efficiency and reducing manual effort in data management processes.',
            technologies: ['Python', 'Selenium', 'BeautifulSoup', 'AWS S3', 'Automation'],
            link: 'https://github.com/marcelomagario?tab=repositories', // Exemplo: link para seu perfil do GitHub ou se houver um repositório público
            image: '/placeholder_project_4.jpg' // Substitua por uma imagem do seu projeto
        },
    ];

    return (
        <div className="portfolio-page">
            <h1>My Portfolio & Projects</h1>
            <p>Here are some of the projects I've worked on, showcasing my skills and experience as a Backend Developer.</p>

            <div className="project-grid">
                {projects.map(project => (
                    <div className="project-card" key={project.id}>
                        {project.image && <img src={project.image} alt={project.title} className="project-thumbnail" />}
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-tech">
                            {project.technologies.map(tech => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-view-project">
                                View Project
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <p>More projects are coming soon! Feel free to contact me for more details.</p>
        </div>
    );
};

export default PortfolioPage;