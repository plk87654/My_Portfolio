// Portfolio Configuration Data - Customize this object to update your portfolio content
const portfolioData = {
    hero: {
        name: "Suraj Dubey", 
        tagline: "Building Tech, Learning AI, Exploring Ideas",
        profileImage: "./profile.jpg", // Replace with your image
        resumeLink: "#" // Add your resume PDF link here
    },
    about: {
        text: "Hey there! I am Suraj Dubey, a passionate technology learner with a growing interest in Artificial Intelligence and Data Science. My focus is on building practical solutions, collaborating effectively in teams, and continuously improving my skills. Outside of Worklife, I enjoy playing sports, and engaging in conversations with people."
    },
    skills: {
        "Soft Skills": ["Problem Solving", "Team Leadership", "Communication", "Adaptability", "Creative Thinking"],
        "Programming": ["Java", "JavaScript", "python", "C-(Basic)"],
        "Web Development": ["HTML/CSS","node.js" ,"Bootstrap", "React.js"],
        "Data": ["Data Analysis", "Pandas", "SQL"],
        "Tools & Technologies": ["Git", "Figma", "Canva", "VS Code",]
    },
    projects: [
    //    {
     //       id: 1,
     //       name: "Project - 1",
            //image: "",
      //      description: "Intelligent chatbot using natural language processing and machine learning for automated customer support with sentiment analysis.",
      //      tools: ["Python", "TensorFlow", "Flask", "NLP"],
       //     github: "https://github.com/yourusername/ai-chatbot",
       //     demo: "https://your-demo-link.com"
        // },
    ],
    achievements: [
        {
            title: "Data Science Fundamental Certificate",
            issuer: "IBM Skills Build",
            link: "https://courses.yl-ptech.skillsnetwork.site/certificates/5e8371b1f4a041df9cee96eca29d9e3c",
            type: "certification"
        },
        {
            title: "Software Engineering Certificate",
            issuer: "L&T Edutech",
            link: "Full-Stack Software Engineering.pdf",
            type: "certification"
        },
        {
            title: "Ethical Hacking Certificate",
            issuer: "L&T Edutech",
            link: "Ethical Hacking Gateway.pdf",
            type: "achievement"
        },
    ],
    education: {
        degree: "Bachelor of Technology in Computer Science",
        university: "Shri Ramswaroop Memorial University (SRMU), Lucknow",
        year: "2023-Present"
    },
    contact: {
        github: "https://github.com/plk87654",
        linkedin: "https://www.linkedin.com/in/suraj-dubey-590a31330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        email: "surajdubey00533@gmail.com",
        instagram: "https://www.instagram.com/_suraj_8__?igsh=MXQ0MzJzempiNmVodw==" // Optional -
    }
};

// Global Variables
let currentFlippedCard = null;
let isTypingComplete = false;

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateActiveNavLink() {
    const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'education', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    let activeIndex = -1;
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = rect.height;
            const scrollPosition = window.scrollY + 150; // Offset for navbar
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeIndex = index;
            }
        }
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current section (skip hero section in nav)
    if (activeIndex > 0 && navLinks[activeIndex - 1]) {
        navLinks[activeIndex - 1].classList.add('active');
    }
}

// Component Creation Functions
function createSkillCard(category, skills) {
    const iconMap = {
        "Soft Skills": "fas fa-user",
        "Programming": "fas fa-code",
        "Web Development": "fas fa-globe",
        "Data & AI": "fas fa-brain",
        "Tools & Technologies": "fas fa-cog"
    };

    const skillsHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-dot"></div>
            <span>${skill}</span>
        </div>
    `).join('');

    return `
        <div class="skill-card">
            <div class="skill-header">
                <i class="${iconMap[category] || 'fas fa-star'}"></i>
                <h3>${category}</h3>
            </div>
            <div class="skill-list">
                ${skillsHTML}
            </div>
        </div>
    `;
}

function createProjectCard(project) {
    const toolsHTML = project.tools.map(tool => 
        `<span class="project-tool">${tool}</span>`
    ).join('');

    return `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-card-inner">
                <div class="project-card-front">
                    <img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy">
                    <div class="project-front-content">
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-hint">Click to flip</p>
                    </div>
                </div>
                <div class="project-card-back">
                    <div>
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tools">
                            ${toolsHTML}
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                            <i class="fab fa-github"></i>
                            <span>Code</span>
                        </a>
                        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createAchievementItem(achievement) {
    return `
        <div class="achievement-item">
            <div class="achievement-content">
                <div class="achievement-icon">
                    <i class="fas fa-award"></i>
                </div>
                <div class="achievement-info">
                    <h3>${achievement.title}</h3>
                    <p>${achievement.issuer}</p>
                </div>
            </div>
            <a href="${achievement.link}" class="achievement-link" target="_blank" rel="noopener noreferrer" title="View Certificate">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;
}

function createSocialLink(platform, url) {
    const iconMap = {
        github: 'fab fa-github',
        linkedin: 'fab fa-linkedin',
        email: 'fas fa-envelope',
        instagram: 'fab fa-instagram'
    };

    const href = platform === 'email' ? `mailto:${url}` : url;
    const target = platform === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"';
    
    return `
        <a href="${href}" class="social-link" ${target} title="${platform.charAt(0).toUpperCase() + platform.slice(1)}">
            <i class="${iconMap[platform]}"></i>
        </a>
    `;
}

// Portfolio Initialization
function initializePortfolio() {
    try {
        // Update hero section
        const heroName = document.getElementById('hero-name');
        const heroTagline = document.getElementById('hero-tagline');
        const profileImg = document.getElementById('profile-img');
        const footerName = document.getElementById('footer-name');
        
        if (heroName) heroName.textContent = portfolioData.hero.name;
        // if (heroTagline) heroTagline.textContent = portfolioData.hero.tagline;
        if (profileImg) {
            profileImg.src = portfolioData.hero.profileImage;
            profileImg.alt = `${portfolioData.hero.name} - Profile Picture`;
        }
        if (footerName) footerName.textContent = portfolioData.hero.name;
        
        // Update about section
        const aboutText = document.getElementById('about-text');
        if (aboutText) aboutText.textContent = portfolioData.about.text;
        
        // Update education section
        const degree = document.getElementById('degree');
        const university = document.getElementById('university');
        const year = document.getElementById('year');
        
        if (degree) degree.textContent = portfolioData.education.degree;
        if (university) university.textContent = portfolioData.education.university;
        if (year) year.textContent = portfolioData.education.year;
        
        // Generate skills section
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = Object.entries(portfolioData.skills)
                .map(([category, skills]) => createSkillCard(category, skills))
                .join('');
        }
        
        // Generate projects section
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = portfolioData.projects
                .map(project => createProjectCard(project))
                .join('');
        }
        
        // Generate achievements section
        const achievementsList = document.getElementById('achievements-list');
        if (achievementsList) {
            achievementsList.innerHTML = portfolioData.achievements
                .map(achievement => createAchievementItem(achievement))
                .join('');
        }
        
        // Generate social links
        const socialLinks = document.getElementById('social-links');
        if (socialLinks) {
            socialLinks.innerHTML = Object.entries(portfolioData.contact)
                .map(([platform, url]) => createSocialLink(platform, url))
                .join('');
        }
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Event Handlers
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Setup cursor tracking for each card
    projectCards.forEach(card => {
        // Mouse move handler for dynamic tilting
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate relative position (0 to 1)
            const relX = x / rect.width;
            const relY = y / rect.height;
            
            // Remove all tilt classes first
            card.classList.remove('tilt-top-left', 'tilt-top-right', 'tilt-bottom-left', 'tilt-bottom-right', 
                                'tilt-top-mid', 'tilt-bottom-mid', 'tilt-mid-left', 'tilt-mid-right');
            
            // Determine tilt direction based on cursor position
            if (relY < 0.33) { // Top third
                if (relX < 0.33) {
                    card.classList.add('tilt-top-left');
                } else if (relX > 0.66) {
                    card.classList.add('tilt-top-right');
                } else {
                    card.classList.add('tilt-top-mid');
                }
            } else if (relY > 0.66) { // Bottom third
                if (relX < 0.33) {
                    card.classList.add('tilt-bottom-left');
                } else if (relX > 0.66) {
                    card.classList.add('tilt-bottom-right');
                } else {
                    card.classList.add('tilt-bottom-mid');
                }
            } else { // Middle third
                if (relX < 0.33) {
                    card.classList.add('tilt-mid-left');
                } else if (relX > 0.66) {
                    card.classList.add('tilt-mid-right');
                }
            }
        });

        // Mouse leave handler to reset tilt
        card.addEventListener('mouseleave', () => {
            card.classList.remove('tilt-top-left', 'tilt-top-right', 'tilt-bottom-left', 'tilt-bottom-right', 
                                'tilt-top-mid', 'tilt-bottom-mid', 'tilt-mid-left', 'tilt-mid-right');
        });
    });

    // Click handler for flip
    document.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        
        if (projectCard && !e.target.closest('.project-link')) {
            const cardId = projectCard.dataset.projectId;
            
            // If another card is flipped, flip it back
            if (currentFlippedCard && currentFlippedCard !== projectCard) {
                currentFlippedCard.classList.remove('flipped');
            }
            
            // Toggle current card
            projectCard.classList.toggle('flipped');
            
            // Update current flipped card reference
            currentFlippedCard = projectCard.classList.contains('flipped') ? projectCard : null;
        }
    });
}

function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Update active nav link on scroll
    const debouncedUpdateNav = debounce(updateActiveNavLink, 10);
    window.addEventListener('scroll', debouncedUpdateNav);
}

function setupResumeButton() {
    const resumeBtn = document.getElementById('resume-btn');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (portfolioData.hero.resumeLink && portfolioData.hero.resumeLink !== '#') {
                // Create a temporary link element to trigger download
                const link = document.createElement('a');
                link.href = portfolioData.hero.resumeLink;
                link.download = `${portfolioData.hero.name}_Resume.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('Resume link not configured. Please update the resumeLink in portfolioData.');
            }
        });
    }
}

// Animation Functions
function startTypingAnimation() {
    const tagline = document.getElementById('hero-tagline');
    
    if (tagline) {
        const originalText = portfolioData.hero.tagline;
        let i = 0;
        const typingSpeed = 100; // Speed of typing
        const erasingSpeed = 50; // Speed of erasing (faster)
        const pauseTime = 1500; // Pause between forward and reverse
        
        function typeForward() {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeForward, typingSpeed);
            } else {
                // Wait, then start erasing
                setTimeout(typeReverse, pauseTime);
            }
        }
        
        function typeReverse() {
            if (i > 0) {
                tagline.textContent = originalText.substring(0, i - 1);
                i--;
                setTimeout(typeReverse, erasingSpeed);
            } else {
                // Wait, then start typing again
                setTimeout(typeForward, pauseTime);
            }
        }
        
        // Start the animation
        typeForward();
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for cards
                const cards = entry.target.querySelectorAll('.skill-card, .project-card, .achievement-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
        
        // Prepare cards for stagger animation
        const cards = section.querySelectorAll('.skill-card, .project-card, .achievement-item');
        cards.forEach(card => {
            // Cards start with CSS-defined hidden state
            card.classList.remove('animate-in');
        });
    });
}

function createParticleBackground() {
    const hero = document.getElementById('hero');
    
    if (hero && !hero.querySelector('.particles-container')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        `;
        
        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                animation: float ${Math.random() * 15 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 15}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        hero.insertBefore(particlesContainer, hero.firstChild);
        
        // Add CSS animation for particles
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% { 
                        transform: translateY(100vh) rotate(0deg); 
                        opacity: 0; 
                    }
                    10% { 
                        opacity: 1; 
                    }
                    90% { 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(-100vh) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Window Event Handlers
function handleResize() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    // Close mobile menu on desktop
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Eye Tracking Setup
function setupCursorEmoji() {
    const character = document.getElementById('watching-character');
    const contactSection = document.getElementById('contact');
    const leftPupil = document.querySelector('.left-eye .pupil');
    const rightPupil = document.querySelector('.right-eye .pupil');
    let isInContactSection = false;
    
    if (!character || !contactSection || !leftPupil || !rightPupil) return;
    
    // Mouse move handler
    function handleMouseMove(e) {
        if (isInContactSection) {
            const characterRect = character.getBoundingClientRect();
            const characterCenterX = characterRect.left + characterRect.width / 2;
            const characterCenterY = characterRect.top + characterRect.height / 2;
            
            // Calculate angle from character center to cursor
            const deltaX = e.clientX - characterCenterX;
            const deltaY = e.clientY - characterCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            
            // Calculate pupil position (limited movement within eye)
            const maxDistance = 3; // Maximum pixels the pupil can move
            const pupilX = Math.cos(angle) * maxDistance;
            const pupilY = Math.sin(angle) * maxDistance;
            
            // Apply pupil movement
            leftPupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
            rightPupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
        }
    }
    
    // Mouse leave handler - reset eyes to center
    function handleMouseLeave() {
        leftPupil.style.transform = 'translate(-50%, -50%)';
        rightPupil.style.transform = 'translate(-50%, -50%)';
    }
    
    // Intersection observer to detect when contact section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInContactSection = true;
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseleave', handleMouseLeave);
            } else {
                isInContactSection = false;
                handleMouseLeave(); // Reset eyes when leaving section
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(contactSection);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
    });
}

// Error Handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });
    
    // Handle image loading errors
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Image+Not+Found';
            e.target.alt = 'Image not found';
        }
    }, true);
}

// Loading Screen Management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading for 1.5 seconds
    }
}

// Main Initialization Function
function initializeApp() {
    try {
        console.log('Initializing portfolio application...');
        
        // Initialize portfolio content
        initializePortfolio();
        
        // Setup event listeners
        setupMobileMenu();
        setupProjectCards();
        setupNavigation();
        setupResumeButton();
        setupCursorEmoji();
        
        // Setup animations
        startTypingAnimation();
        setupScrollAnimations();
        createParticleBackground();
        
        // Handle loading screen
        hideLoadingScreen();
        
        // Setup window events
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // Setup error handling
        handleErrors();
        
        console.log('Portfolio application initialized successfully');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        
        // Hide loading screen even if there's an error
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    script.onload = () => console.log('Smooth scroll polyfill loaded');
    script.onerror = () => console.warn('Failed to load smooth scroll polyfill');
    document.head.appendChild(script);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, initializeApp };
}