document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            menu.classList.toggle('open');
            hamburger.innerHTML = menu.classList.contains('open') ? '&times;' : '&#9776;';
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : 'auto';
        });
    }

    document.querySelectorAll('.menu li a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

         
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            if (menu) {
                menu.classList.remove('open');
                document.body.style.overflow = 'auto';
                if (hamburger) {
                    hamburger.innerHTML = '&#9776;';
                }
            }
        });
    });
});