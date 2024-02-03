document.addEventListener("DOMContentLoaded", function() {
       var elementsToShow = document.querySelectorAll('.card');

       function isElementInViewport(el) {
           var rect = el.getBoundingClientRect();
           return (
               rect.top >= 0 &&
               rect.left >= 0 &&
               rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
               rect.right <= (window.innerWidth || document.documentElement.clientWidth)
           );
       }

       function showElementsOnScroll() {
           elementsToShow.forEach(function(element) {
               if (isElementInViewport(element)) {
                   element.classList.add('animate__animated', 'animate__fadeInUp');
               }
           });
       }

       window.addEventListener('scroll', showElementsOnScroll);

       // Показываем видимые элементы при загрузке страницы
       showElementsOnScroll();
   });
