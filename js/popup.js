$(document).ready(function() {
    function showElementsOnScroll() {
        var elements = []; // Массив для всех элементов, которые нужно анимировать

        // Добавляем элементы из первой функции
        $('.row-item').each(function(index) {
            if (isElementInViewport($(this))) {
                elements.push({ element: $(this), index: index });
            }
        });

        // Добавляем элементы из второй функции
        $('.about-column').each(function(index) {
            if (isElementInViewport($(this))) {
                elements.push({ element: $(this), index: index });
            }
        });

        // Анимируем каждый элемент
        elements.forEach(function(item) {
            setTimeout(function() {
                item.element.addClass('animated');
            }, (item.index + 1) * 1200); // Increase the delay for each item
        });
    }

    // Обработчик события прокрутки
    $(window).scroll(showElementsOnScroll);

    // Показываем видимые элементы при загрузке страницы
    showElementsOnScroll();

    // Функция для проверки, виден ли элемент во viewport
    function isElementInViewport(el) {
        var rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
