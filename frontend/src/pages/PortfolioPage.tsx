import React from 'react';

// Definimos a estrutura de um projeto
interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl: string;
}

// Dados dos projetos (hardcoded por enquanto)
// Substitua com seus próprios projetos! Use uma imagem real ou um placeholder.
const projects: Project[] = [
  {
    title: 'Meu Portfólio Pessoal',
    description: 'O próprio site que você está navegando! Construído com React, TypeScript e uma API Node.js/Express para o blog e CMS.',
    imageUrl: 'https://placehold.co/600x400/16191f/ffffff?text=Portfolio',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS SES'],
    liveUrl: '#', // Link para a própria página
    repoUrl: 'https://github.com/your-username/your-portfolio-repo'
  },
    {
    title: 'API de Análise de Dados',
    description: 'Uma API RESTful que processa grandes volumes de dados e fornece endpoints para análise e visualização.',
    imageUrl: 'https://placehold.co/600x400/16191f/ffffff?text=Data+API',
    techStack: ['Python', 'FastAPI', 'Pandas', 'Docker'],
    repoUrl: 'https://github.com/your-username/data-api'
  }
];

const PortfolioPage: React.FC = () => {
  return (
    <div className="portfolio-container">
      <h1>Meu Portfólio</h1>
      <p>Aqui estão alguns dos projetos em que trabalhei. Clique para ver o código ou a versão ao vivo.</p>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card">
            <img src={project.imageUrl} alt={`Screenshot do projeto ${project.title}`} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Ver Ao Vivo
                  </a>
                )}
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Ver Código
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;