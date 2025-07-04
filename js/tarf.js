document.addEventListener('DOMContentLoaded', function() {
    const tariffs = document.querySelectorAll('.tariff');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    tariffs.forEach(tariff => {
        observer.observe(tariff);
    });
});