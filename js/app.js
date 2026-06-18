document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            alert('\u00a1Gracias por contactarnos, ' + nombre + '! Te responderemos pronto a ' + email);
            
            contactForm.reset();
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Recommendation Card Hover Effects
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    recommendationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Setup Enter key for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// ========== SEARCH FUNCTIONALITY ==========

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Por favor, ingrese un t\u00e9rmino de b\u00fasqueda.');
        return;
    }
    
    const cards = document.querySelectorAll('.recommendation-card');
    let foundResults = false;
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.recommendation-desc').textContent.toLowerCase();
        const cardText = title + ' ' + description;
        
        if (cardText.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('search-match');
            foundResults = true;
        } else {
            card.style.display = 'none';
            card.classList.remove('search-match');
        }
    });
    
    if (!foundResults) {
        alert('No se encontraron resultados para: "' + searchInput.value + '"');
        clearSearch();
    } else {
        scrollToResults();
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('search-match');
    });
}

function scrollToResults() {
    const recommendationsSection = document.getElementById('recomendaciones');
    if (recommendationsSection) {
        recommendationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}