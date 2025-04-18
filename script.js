// Loading screen with enhanced animation
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">MD</div>
            <div class="loading-progress"></div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Simulate loading progress
    const progressBar = document.querySelector('.loading-progress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        if (progress <= 100) {
            progressBar.style.width = `${progress}%`;
        } else {
            clearInterval(interval);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                // Initialize animations
                triggerAnimations();
            }, 1000);
        }
    }, 20);
});

// Enhanced Intersection Observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation for project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

function triggerAnimations() {
    // Observe all sections with staggered delay
    document.querySelectorAll('.hero, .about, .skills, .projects, .contact').forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(section);
    });

    // Observe hero content and profile image
    document.querySelectorAll('.hero-content, .profile-image').forEach(element => {
        scrollObserver.observe(element);
    });

    // Add staggered animation to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.dataset.delay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Add staggered animation to skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.dataset.delay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });
}

// Enhanced language switcher functionality
const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    pt: {
        home: 'Home',
        about: 'Sobre',
        skills: 'Habilidades',
        projects: 'Projetos',
        contact: 'Contato',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar Mensagem'
    },
    en: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message'
    }
};

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Add transition effect
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
});

// Enhanced mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Add animation to menu items
        const menuItems = document.querySelectorAll('.nav-links a');
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.transform = navLinks.classList.contains('active') ? 'translateX(0)' : 'translateX(-20px)';
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Enhanced back to top button functionality
const backToTop = document.getElementById('back-to-top');
const header = document.querySelector('.header');
let lastScroll = 0;

// Combined scroll event handler with enhanced animations
window.addEventListener('scroll', () => {
    // Back to top button visibility with fade effect
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }

    // Enhanced header scroll effect
    if (header) {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced smooth scrolling for navigation links
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

// Enhanced active class for nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced project cards animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Add staggered animation
            entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    observer.observe(card);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effect to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
}); 