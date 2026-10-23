document.addEventListener("DOMContentLoaded", () => {

    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            reset: false,
            distance: '60px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });

        sr.reveal('.modern-section, .benefit-card', { origin: 'bottom', interval: 150 });
        sr.reveal('.premium-heading, .luxury-line', { origin: 'top', distance: '20px' });
    }

    const buttons = document.querySelectorAll('.modern-action-button, .modern-gold-button, .btn-subscribe');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transition = 'transform 0.1s ease';
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.5s ease';
            btn.style.transform = `translate(0, 0)`;
        });
    });


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


});