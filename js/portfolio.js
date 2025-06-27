document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.querySelector('.background-image-container');
    const buttonContainer = document.querySelector('.button-container');

    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Чтобы анимация не повторялась
            }
        });
    }, options);

    observer.observe(imageContainer);
    observer.observe(buttonContainer);
});