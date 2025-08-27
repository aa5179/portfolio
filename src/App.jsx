import { useState, useEffect } from "react";
import "./App.css";
import ProjectsPage from "./ProjectsPage";
// import LoadingPage from "./LoadingPage";
import LoadingPage from "./LoadingPage";

const TypeWriter = ({
  text,
  delay = 100,
  startDelay = 0,
  className = "",
  showCursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTypingCursor, setShowTypingCursor] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowTypingCursor(true);
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setShowTypingCursor(false), 500);
      }
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, delay, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && showTypingCursor && (
        <span className="typewriter-cursor">|</span>
      )}
    </span>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(0);
  const [cursorScale, setCursorScale] = useState(0.5);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProjectsPage, setShowProjectsPage] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHeroAnimations, setShowHeroAnimations] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };

  const toggleProjectsPage = () => {
    setShowProjectsPage(!showProjectsPage);
  };

  const toggleSocialLinks = () => {
    setShowSocialLinks(!showSocialLinks);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage(
          "✨ Message sent successfully! I'll get back to you soon."
        );
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          toggleContactModal();
          setSubmitMessage("");
        }, 2000);
      } else {
        setSubmitMessage("❌ Failed to send message. Please try again.");
      }
    } catch {
      setSubmitMessage("❌ Network error. Please check your connection.");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnterThird = () => {
      if (!isMobile) {
        setShowCustomCursor(true);
        document.body.style.cursor = "none";

        setCursorOpacity(0);
        setCursorScale(0.5);

        setTimeout(() => {
          setCursorOpacity(1);
          setCursorScale(1);
        }, 10);
      }
    };

    const handleMouseLeaveThird = () => {
      if (!isMobile) {
        setCursorOpacity(0);
        setCursorScale(0.5);
        setTimeout(() => {
          setShowCustomCursor(false);
          document.body.style.cursor = "default";
        }, 300);
      }
    };

    if (!isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    const thirdSection = document.querySelector(".third");
    if (thirdSection && !isMobile) {
      thirdSection.addEventListener("mouseenter", handleMouseEnterThird);
      thirdSection.addEventListener("mouseleave", handleMouseLeaveThird);
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.removeEventListener("mousemove", handleMouseMove);
      if (thirdSection) {
        thirdSection.removeEventListener("mouseenter", handleMouseEnterThird);
        thirdSection.removeEventListener("mouseleave", handleMouseLeaveThird);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      document.body.classList.add("mobile");
      document.body.style.overscrollBehavior = "none";

      let lastTouchEnd = 0;
      document.addEventListener(
        "touchend",
        function (event) {
          const now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowHeroAnimations(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      {!isMobile && showCustomCursor && (
        <div
          className="custom-cursor"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            opacity: cursorOpacity,
            transform: `translate(-50%, -50%) scale(${cursorScale})`,
          }}
        />
      )}

      <div className="herosection">
        {showHeroAnimations ? (
          <>
            <h1 className="heading karantina-bold">
              <TypeWriter
                text="ADITYA"
                delay={80}
                startDelay={100}
                showCursor={false}
              />
            </h1>
            <div className="heads">
              <h2 className="subheading2 karantina-regular">
                <TypeWriter
                  text="CURIOUS HUMAN"
                  delay={8}
                  startDelay={100}
                  showCursor={false}
                />
              </h2>
              <h2 className="subheading karantina-regular">
                <TypeWriter
                  text="STUDENT"
                  delay={15}
                  startDelay={200}
                  showCursor={false}
                />
              </h2>
            </div>
            <img
              src="src/assets/self.png"
              alt=""
              className="self slide-up-image"
            />
          </>
        ) : (
          <>
            <h1 className="heading karantina-bold invisible">ADITYA</h1>
            <div className="heads">
              <h2 className="subheading2 karantina-regular invisible">
                CURIOUS HUMAN
              </h2>
              <h2 className="subheading karantina-regular invisible">
                STUDENT
              </h2>
            </div>
            <img src="src/assets/self.png" alt="" className="self invisible" />
          </>
        )}
        <img src="src/assets/t1.png" alt="" className="trans1" />
      </div>
      <div className="second">
        <h1 className="head karantina-bold">
          Marvel at First Steps of Creative Ingenuity
        </h1>
        <div className="content">
          <h4 className="cont lacquer-regular">
            A budding explorer in the world of web development, I’ve spent the
            past year diving into the art of building responsive websites and
            interactive experiences. With curiosity as my compass and creativity
            as my fuel, I’m learning the ropes of HTML, CSS, JavaScript, and
            React crafting simple yet engaging designs while steadily sharpening
            my skills for the road ahead.
          </h4>
          <img src="/assets/lantern.png" alt="" className="lantern" />
        </div>
      </div>
      <div className="third">
        <img src="src/assets/t2.png" alt="" className="trans2" />
        <video
          src="src/assets/3068-165796695_small.mp4"
          className="vid"
          autoPlay
          loop
          muted
        ></video>
        <div className="ouija">
          <h1 className="skills abhaya-libre-bold">
            <span className="desktop-heading">Tools of the trade</span>
            <span className="mobile-heading lacquer-regular">
              The Summoning
            </span>
          </h1>
          <h3 className="subheading3 abhaya-libre-semibold">
            Skills Summoned from the Beyond
          </h3>
          <div className="skillicons">
            <div className="desktop-skills">
              <div className="skill-row row-1">
                <img
                  src="src/assets/html.png"
                  alt="HTML"
                  className="skill-icon"
                />
                <img
                  src="src/assets/css.png"
                  alt="CSS"
                  className="skill-icon"
                />
                <img
                  src="src/assets/js.png"
                  alt="JavaScript"
                  className="skill-icon"
                />
                <img
                  src="src/assets/react.png"
                  alt="React"
                  className="skill-icon"
                />
                <img
                  src="src/assets/python.png"
                  alt="Python"
                  className="skill-icon"
                />
                <img
                  src="src/assets/java.png"
                  alt="Java"
                  className="skill-icon"
                />
                <img src="src/assets/c.png" alt="C#" className="skill-icon" />
              </div>
              <div className="skill-row row-2">
                <img
                  src="src/assets/c++.png"
                  alt="C++"
                  className="skill-icon"
                />
                <img
                  src="src/assets/mongodb.png"
                  alt="MongoDB"
                  className="skill-icon"
                />
                <img
                  src="src/assets/tailwind.png"
                  alt="Tailwind CSS"
                  className="skill-icon"
                />
              </div>
            </div>

            <div className="mobile-skills">
              <img
                src="src/assets/html.png"
                alt="HTML"
                className="skill-icon circle-icon"
                data-position="1"
              />
              <img
                src="src/assets/css.png"
                alt="CSS"
                className="skill-icon circle-icon"
                data-position="2"
              />
              <img
                src="src/assets/js.png"
                alt="JavaScript"
                className="skill-icon circle-icon"
                data-position="3"
              />
              <img
                src="src/assets/react.png"
                alt="React"
                className="skill-icon circle-icon"
                data-position="4"
              />
              <img
                src="src/assets/python.png"
                alt="Python"
                className="skill-icon circle-icon"
                data-position="5"
              />
              <img
                src="src/assets/java.png"
                alt="Java"
                className="skill-icon circle-icon"
                data-position="6"
              />
              <img
                src="src/assets/c.png"
                alt="C#"
                className="skill-icon circle-icon"
                data-position="7"
              />
              <img
                src="src/assets/c++.png"
                alt="C++"
                className="skill-icon circle-icon"
                data-position="8"
              />
              <img
                src="src/assets/mongodb.png"
                alt="MongoDB"
                className="skill-icon circle-icon"
                data-position="9"
              />
              <img
                src="src/assets/tailwind.png"
                alt="Tailwind CSS"
                className="skill-icon circle-icon"
                data-position="10"
              />
            </div>
          </div>

          <div className="ouija-buttons">
            <button className="ouija-btn yes-btn" onClick={toggleProjectsPage}>
              <img src="src/assets/Rituals Performed.png" alt="Projects" />
            </button>
            <button
              className="ouija-btn no-btn"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Resume.pdf";
                link.download = "Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <img src="src/assets/The Grimoire.png" alt="Resume" />
            </button>
            <button
              className="ouija-btn goodbye-btn"
              onClick={toggleSocialLinks}
            >
              <img src="src/assets/Spirit Gateways.png" alt="Social Links" />
            </button>
          </div>
        </div>
        <div className="t1">
          <img src="src/assets/transition1.png" alt="" className="t1" />
        </div>
      </div>
      <div className="fourth">
        <img
          src="src/assets/transition2.png"
          alt=""
          className="t1 transition-above"
        />
        <div className="content-layer">
          <h1 className="lasthead karantina-bold">AWW HELL!</h1>
          <h3 className="lasthead2 karantina-bold">
            This is the end of the page! but the fire looks cool, right?
          </h3>
        </div>

        <div className="fire-background">
          <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
            <defs>
              <filter id="fire-wobble" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  baseFrequency="0.02 0.06"
                  numOctaves="3"
                  result="heatFlow1"
                  type="fractalNoise"
                  seed="1"
                >
                  <animate
                    attributeName="seed"
                    values="1;50;100;150;200;250;300"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>

                <feTurbulence
                  baseFrequency="0.03 0.04"
                  numOctaves="2"
                  result="heatFlow2"
                  type="turbulence"
                  seed="100"
                >
                  <animate
                    attributeName="seed"
                    values="100;200;300;400;500;600;700"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>

                <feTurbulence
                  baseFrequency="0.05 0.01"
                  numOctaves="2"
                  result="shimmer"
                  type="fractalNoise"
                  seed="200"
                >
                  <animate
                    attributeName="seed"
                    values="200;300;400;500;600"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>

                <feDisplacementMap
                  in="SourceGraphic"
                  in2="heatFlow1"
                  scale="12"
                  result="verticalHeat"
                />

                <feDisplacementMap
                  in="verticalHeat"
                  in2="shimmer"
                  scale="6"
                  result="combinedHeat"
                />

                <feDisplacementMap
                  in="combinedHeat"
                  in2="heatFlow2"
                  scale="8"
                  result="finalHeat"
                />

                <feGaussianBlur
                  in="finalHeat"
                  stdDeviation="0.6"
                  result="heatBlur"
                />

                <feColorMatrix
                  in="displacement"
                  type="matrix"
                  values="1.2 0 0 0 0.05
                          0.1 1.0 0 0 0.02
                          0 0 0.7 0 0
                          0 0 0 1 0"
                  result="final"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <div className="content-layer">
          <h1 className="lasthead karantina-bold">AWW HELL!</h1>
          <h3 className="lasthead2 karantina-bold">
            This is the end of the page! but the fire looks cool, right?
          </h3>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title abhaya-libre-bold">Connect</h3>
            <div className="footer-links">
              <a
                href="https://www.github.com/aa5179"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-arora-556b5028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/bhaikuchkrle"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Instagram
              </a>
              <a href="mailto:aroraaditya358@gmail.com" className="footer-link">
                Email
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title abhaya-libre-bold">About</h3>
            <p className="footer-description lacquer-regular">
              A curious explorer crafting digital experiences with passion and
              creativity.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title abhaya-libre-bold">Quick Links</h3>
            <div className="footer-links">
              <a href="#" className="footer-link" onClick={toggleProjectsPage}>
                Projects
              </a>
              <a
                href="/Resume.pdf"
                className="footer-link"
                download="Resume.pdf"
              >
                Resume
              </a>
              <a className="footer-link" onClick={toggleContactModal}>
                Contact Me
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright lacquer-regular">
            © 2025 Aditya. All rights reserved. | Built with React & mystical
            energy ✨
          </p>
        </div>
      </footer>

      {showContactModal && (
        <div className="contact-modal-overlay" onClick={toggleContactModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2 className="contact-title karantina-bold">Summon Me</h2>
              <button className="contact-close" onClick={toggleContactModal}>
                ✕
              </button>
            </div>

            <div className="contact-content">
              <p className="contact-description lacquer-regular">
                Ready to collaborate on mystical digital experiences? Send me a
                message through the ethereal plane.
              </p>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label abhaya-libre-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your mystical name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label abhaya-libre-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="your.email@realm.com"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label abhaya-libre-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="What brings you to my realm?"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label abhaya-libre-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    rows="5"
                    placeholder="Cast your message into the digital void..."
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className="submit-message lacquer-regular">
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-submit karantina-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Casting..." : "Cast Message ✨"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <ProjectsPage isVisible={showProjectsPage} onClose={toggleProjectsPage} />

      {showSocialLinks && (
        <div className="social-modal-overlay" onClick={toggleSocialLinks}>
          <div className="social-modal" onClick={(e) => e.stopPropagation()}>
            <div className="social-modal-header">
              <h2 className="social-title karantina-bold">Spirit Gateways</h2>
              <p className="social-subtitle lacquer-regular">
                Connect across the digital realms
              </p>
              <button className="social-close" onClick={toggleSocialLinks}>
                ✕
              </button>
            </div>

            <div className="social-content">
              <div className="social-grid">
                <a
                  href="https://www.github.com/aa5179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <div className="social-icon">
                    <img src="/src/assets/git.png" alt="GitHub" />
                  </div>
                  <div className="social-info">
                    <h3>GitHub</h3>
                    <p>Code Repository</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/aditya-arora-556b5028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <div className="social-icon">
                    <img src="/src/assets/linkedin.png" alt="LinkedIn" />
                  </div>
                  <div className="social-info">
                    <h3>LinkedIn</h3>
                    <p>Professional Network</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/bhaikuchkrle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                >
                  <div className="social-icon">
                    <img src="/src/assets/insta.png" alt="Instagram" />
                  </div>
                  <div className="social-info">
                    <h3>Instagram</h3>
                    <p>Visual Journey</p>
                  </div>
                </a>

                <a
                  href="mailto:aroraaditya358@gmail.com"
                  className="social-link email"
                >
                  <div className="social-icon">
                    <img src="/src/assets/mail.png" alt="Email" />
                  </div>
                  <div className="social-info">
                    <h3>Email</h3>
                    <p>Direct Contact</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
