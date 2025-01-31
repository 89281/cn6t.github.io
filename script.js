// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeButton = document.querySelector('.theme-button');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Check if user is admin (you can set this using localStorage)
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        themeSwitcher.style.display = 'none';
    }

    // Add admin key press combination (Ctrl + Shift + A)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            localStorage.setItem('isAdmin', 'true');
            themeSwitcher.style.display = 'block';
        }
        // Remove admin access with Ctrl + Shift + R
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            localStorage.setItem('isAdmin', 'false');
            themeSwitcher.style.display = 'none';
        }
    });

    // Set initial theme from localStorage or default to purple
    const currentTheme = localStorage.getItem('theme') || 'purple';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle theme options panel
    themeButton.addEventListener('click', () => {
        themeSwitcher.classList.toggle('active');
    });

    // Close theme options when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeSwitcher.contains(e.target)) {
            themeSwitcher.classList.remove('active');
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeSwitcher.classList.remove('active');
        });
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scroll = window.pageYOffset;
        hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
    }
});

// Animate features on scroll
const features = document.querySelectorAll('.feature');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

features.forEach(feature => {
    feature.style.opacity = 0;
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(feature);
});

// Add hover effect to team members
const members = document.querySelectorAll('.member');
members.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-10px)';
    });
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0)';
    });
});

// Cursor animation
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (cardTop < triggerBottom) {
            card.classList.add('show');
        }
    });
});

// Add hover effects for team cards
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
