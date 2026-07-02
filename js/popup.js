document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Инициализация ScrollReveal (Плавное появление блоков)
    // Подключаем библиотеку через cdn в HTML, а тут настраиваем
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

    // 2. Магнитный эффект для кнопок
    const buttons = document.querySelectorAll('.modern-action-button, .modern-gold-button, .btn-subscribe');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Плавное следование за курсором
            btn.style.transition = 'transform 0.1s ease';
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.5s ease';
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // 3. Плавный скролл по якорным ссылкам
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

    // 4. Parallax для секций с фоновым изображением
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxBlocks = document.querySelectorAll('.modern-parallax-portfolio');
        
        parallaxBlocks.forEach(block => {
            block.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    });
    
});