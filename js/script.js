$(window).on('load', function() {
  // 1. Плавное скрытие экрана загрузки
  $('#preloader').delay(500).fadeOut('slow');
});

$(document).ready(function() {
  
  // 2. Интерактивный слайдер ДО/ПОСЛЕ (первый тип)
  const slider = $('.comparison-slider');
  if(slider.length) {
    slider.on('mousemove touchmove', function(e) {
      if (e.type === 'touchmove') e.preventDefault(); // Предотвращаем скролл страницы
      
      const sliderWidth = slider.width();
      const pageX = (e.type === 'touchmove') ? e.originalEvent.touches[0].pageX : e.pageX;
      const offsetLeft = slider.offset().left;
      let pointerPosition = pageX - offsetLeft;
      
      if (pointerPosition < 0) pointerPosition = 0;
      if (pointerPosition > sliderWidth) pointerPosition = sliderWidth;
      
      $('.resize-container').css('width', pointerPosition + 'px');
      $('.slider-handle').css('left', pointerPosition + 'px');
    });
  }

  // 3. Интерактивный FAQ (Аккордеон)
  $('.faq-question').on('click', function() {
    const item = $(this).parent('.faq-item');
    if(item.hasClass('active')) {
      item.removeClass('active');
    } else {
      $('.faq-item').removeClass('active');
      item.addClass('active');
    }
  });

  // 4. Логика слайдера «ДО / ПОСЛЕ» (второй тип - bal-container)
  const $container = $('.bal-container');
  
  if ($container.length > 0) {
    // Устанавливаем touch-action через JS для предотвращения скролла
    $container.css('touch-action', 'none');

    $container.on('mousemove touchmove', function(e) {
      if (e.type === 'touchmove') e.preventDefault(); // Предотвращаем скролл страницы
      
      const containerWidth = $container.width();
      const containerOffset = $container.offset().left;
      let pageX = (e.type === 'touchmove') ? e.originalEvent.touches[0].pageX : e.pageX;

      let relativeX = pageX - containerOffset;
      if (relativeX < 0) relativeX = 0;
      if (relativeX > containerWidth) relativeX = containerWidth;

      const percentage = (relativeX / containerWidth) * 100 + '%';
      
      $(this).find('.bal-before').css('width', percentage);
      $(this).find('.bal-handle').css('left', percentage);
    });
  }
});