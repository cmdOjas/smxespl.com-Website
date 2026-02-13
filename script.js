// ================================
// PAGE NAVIGATION SYSTEM (FIXED)
// ================================
const navLinks = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Show page function (ONLY page-based navigation)
function showPage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('data-page') === pageName
        );
    });

    // Scroll to top
    window.scrollTo({ top: 0 });

    // Close mobile menu
    if (navMenu && mobileMenuToggle) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}

// Nav click handling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        showPage(pageName);
    });
});

// ================================
// MOBILE MENU
// ================================
if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ================================
// COUNTERS
// ================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    let current = 0;
    const increment = target / 120;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// FADE-IN ANIMATIONS
// ================================
const fadeElements = document.querySelectorAll(
    '.stat-card, .feature-card, .service-card, .service-detail-card, .deal-category'
);

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ================================
// PAGE LOAD FADE
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// ================================
// BUTTON RIPPLE
// ================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.hasAttribute('data-page')) return;

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        ripple.className = 'ripple';

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ================================
// CONTACT FORM
// ================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error();
            }
        } catch {
            formStatus.textContent = 'Failed to send message.';
            formStatus.className = 'form-status error';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
}

console.log('Navigation system fixed and loaded');
// ================================
// SERVICE DROPDOWN LOGIC
// ================================
function checkService() {
    const service = document.getElementById("service");
    const extraFields = document.getElementById("flowExtraFields");
    const rangeInput = document.getElementById("range");
    const pipeInput = document.getElementById("pipeSize");

    if (!service || !extraFields) return;

    if (service.value === "Flow Meter Calibration") {
        extraFields.style.display = "block";

        // Make mandatory
        rangeInput.required = true;
        pipeInput.required = true;

    } else {
        extraFields.style.display = "none";

        // Remove mandatory
        rangeInput.required = false;
        pipeInput.required = false;

        // Optional: clear values when hidden
        rangeInput.value = "";
        pipeInput.value = "";
    }
}

