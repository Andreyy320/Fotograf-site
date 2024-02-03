$(document).ready(function() {
    const $carousel = $('.carousel');
    const $carouselItems = $('.carousel-item');
    const $prevButton = $('.carousel-control-prev');
    const $nextButton = $('.carousel-control-next');
    let currentIndex = 0;
    let intervalId;

    function goToSlide(index) {
        $carouselItems.hide();
        $carouselItems.eq(index).fadeIn();
    }

    function nextSlide() {
        currentIndex = (currentIndex === $carouselItems.length - 1) ? 0 : currentIndex + 1;
        goToSlide(currentIndex);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 3000); // Переключение слайдов каждые 3 секунды
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    $prevButton.on('click', function() {
        currentIndex = (currentIndex === 0) ? $carouselItems.length - 1 : currentIndex - 1;
        goToSlide(currentIndex);
    });

    $nextButton.on('click', function() {
        currentIndex = (currentIndex === $carouselItems.length - 1) ? 0 : currentIndex + 1;
        goToSlide(currentIndex);
    });

    startAutoSlide(); // Начать автоматическое переключение слайдов

    // Остановка автоматического переключения при наведении на карусель
    $carousel.hover(function() {
        stopAutoSlide();
    }, function() {
        startAutoSlide();
    });
});
