// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Full Stack Developer',
    'Software Engineer',
    'Problem Solver',
    'Tech Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
typeEffect();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .timeline-item, .project-card, .about-content').forEach(el => {
    observer.observe(el);
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg-card)';
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    } else {
        navbar.style.background = 'var(--bg-card)';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message (you can replace this with actual form submission)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Download Resume Button
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download will be available soon!');
    // You can add actual download functionality here
});

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    .skill-item,
    .timeline-item,
    .project-card,
    .about-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-item.animate,
    .timeline-item.animate,
    .project-card.animate,
    .about-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Blog Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        blogCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hide');
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease';
                }, 100);
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease';
                    }, 100);
                } else {
                    card.classList.add('hide');
                }
            }
        });
    });
});

// Blog Pagination
const paginationBtns = document.querySelectorAll('.pagination-btn');
const pageNumbers = document.querySelectorAll('.page-number');

pageNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        pageNumbers.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Scroll to blog section
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
