import React from "react";

const ProjectsPage = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const projects = [
    {
      id: 1,
      title: "ANAKTO",
      subtitle: "Cryptographic Inheritance Wallet",
      description:
        "A revolutionary cryptocurrency wallet that ensures your digital assets never vanish into the void. ANAKTO employs advanced cryptographic protocols to securely transfer wallet access to your designated beneficiary when you're unable to access your funds - whether due to forgotten passwords or unforeseen circumstances. Your crypto legacy, protected by cutting-edge security.",
      technologies: [
        "Blockchain",
        "Cryptography",
        "Security Protocols",
        "Digital Inheritance",
      ],
      status: "Active",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      title: "ASL Bridge",
      subtitle: "Universal Sign Language Translator",
      description:
        "Breaking down communication barriers through AI-powered sign language interpretation. This ambitious project transforms sign language gestures into text, converts written text into visual sign language, and translates spoken words into sign language - creating a bridge between hearing and deaf communities. Currently achieving 60% accuracy with continuous improvements in machine learning models.",
      technologies: [
        "Computer Vision",
        "Machine Learning",
        "NLP",
        "AI",
        "OpenCV",
      ],
      status: "In Development",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      id: 3,
      title: "FEAR RANK",
      subtitle: "Ultimate Horror Movie Curator",
      description:
        "Every horror enthusiast's dream destination - a meticulously crafted platform for discovering, rating, and exploring the darkest corners of cinema. FEAR RANK combines comprehensive horror movie databases with intelligent recommendation algorithms, user reviews, and detailed analytics. From classic Gothic nightmares to modern psychological thrillers, find your next spine-chilling experience.",
      technologies: [
        "React",
        "Movie APIs",
        "Rating Systems",
        "Recommendation Engine",
      ],
      status: "Featured Project",
      gradient: "from-red-600 to-orange-600",
    },
  ];

  return (
    <div className="projects-page-overlay" onClick={onClose}>
      <div className="projects-page" onClick={(e) => e.stopPropagation()}>
        <div className="projects-header">
          <h1 className="projects-title karantina-bold">Mystical Creations</h1>
          <p className="projects-subtitle lacquer-regular">
            Digital artifacts forged in the fires of curiosity and innovation
          </p>
          <button className="projects-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div
                className={`project-header bg-gradient-to-r ${project.gradient}`}
              >
                <div className="project-status">
                  <span className="status-badge">{project.status}</span>
                </div>
                <h2 className="project-title karantina-bold">
                  {project.title}
                </h2>
                <h3 className="project-subtitle abhaya-libre-semibold">
                  {project.subtitle}
                </h3>
              </div>

              <div className="project-content">
                <p className="project-description lacquer-regular">
                  {project.description}
                </p>

                <div className="project-tech">
                  <h4 className="tech-title abhaya-libre-semibold">
                    Technologies
                  </h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <a
                    href="https://www.github.com/aa5179"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn secondary"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-footer">
          <p className="footer-text lacquer-regular">
            More mystical creations brewing in the digital cauldron...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
