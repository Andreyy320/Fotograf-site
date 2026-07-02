document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');

    // 1. Открытие/Закрытие бургера
    if (hamburger && menu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Важно: предотвращает закрытие сразу после открытия
            menu.classList.toggle('open');
            hamburger.innerHTML = menu.classList.contains('open') ? '&times;' : '&#9776;';
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : 'auto';
        });
    }

    // 2. Обработка кликов по ссылкам
    document.querySelectorAll('.menu li a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Если это якорь (#), плавно скроллим
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            // Закрываем меню в любом случае (будь то якорь или внешняя ссылка)
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