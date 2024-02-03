document.addEventListener("DOMContentLoaded", function() {
       var aboutColumns = document.querySelectorAll('.gift .about-column');
       var sertificat = document.querySelector('.gift .sertificat');

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
           aboutColumns.forEach(function(column) {
               if (isElementInViewport(column)) {
                   column.classList.add('show');
               }
           });
           if (isElementInViewport(sertificat)) {
               sertificat.classList.add('show');
           }
       }

       window.addEventListener('scroll', showElementsOnScroll);

       // Показываем видимые элементы при загрузке страницы
       showElementsOnScroll();
   });
