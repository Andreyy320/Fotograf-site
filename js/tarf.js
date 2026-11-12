document.addEventListener('DOMContentLoaded', function () {
    const tariffs = document.querySelectorAll('.tariff');
    const section = document.getElementById('tariffs-section');

    function showAll() {
        tariffs.forEach(function (t, i) {
            setTimeout(function () { t.classList.add('show'); }, i * 80);
        });
    }

    // Показываем все тарифы, как только секция подъезжает к экрану
    if ('IntersectionObserver' in window && section) {
        const io = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                showAll();
                io.disconnect();
            }
        }, { threshold: 0, rootMargin: '300px 0px' });
        io.observe(section);
    } else {
        showAll();
    }

    // Нажали «Тарифы» в меню — показываем сразу
    document.querySelectorAll('a[href="#tariffs-section"]').forEach(function (a) {
        a.addEventListener('click', showAll);
    });

    // Страховка: если что-то пошло не так, через 4 секунды всё равно покажем
    setTimeout(showAll, 4000);

    // Если зашли по ссылке сразу на тарифы
    if (location.hash === '#tariffs-section') showAll();
});