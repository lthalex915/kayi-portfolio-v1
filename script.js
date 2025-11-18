document.addEventListener('DOMContentLoaded', () => {
    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows immediately
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (using animate for smoothness)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
    }

    // Hover effects for custom cursor scale change
    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered');
        });
        trigger.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered');
        });
    });

    // --- SECTION OBSERVER (Reveal Animations) ---
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.progress-dot');

    const observerOptions = {
        root: document.querySelector('#main-scroll'),
        threshold: 0.5 // Trigger when 50% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for text animations
                entry.target.classList.add('visible');

                // Update Progress Dots
                const id = entry.target.getAttribute('id');
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.target === id) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
