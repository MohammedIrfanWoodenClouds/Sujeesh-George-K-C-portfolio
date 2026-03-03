// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Contact Form Submission (EmailJS Integration)
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-button');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Auto-fetch current time
        this.time.value = new Date().toLocaleString();

        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const serviceID = 'service_e7hto0e';
        const templateID = 'template_9wgm5j8';

        console.log('Sending form data...', {
            name: this.name.value,
            email: this.email.value,
            time: this.time.value,
            message: this.message.value
        });

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            }, (err) => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                alert('Oops! Something went wrong. ' + JSON.stringify(err));
            });
    });
}

// Hover Effect for Venture Cards
const ventureCards = document.querySelectorAll('.venture-card');
ventureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
});
