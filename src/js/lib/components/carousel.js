import $ from '../core';

// Слайдер-карусель на основе статической верстки
$.prototype.carousel = function(autoplay, autoplayInterval = 5000) {
    for (let i = 0; i < this.length; i++) {
        // переменая равная ширине обертки, чтоб далее задать такую ширину каждому слайду (и на эту же ширину сдвигать слайдер)
        const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width,
            // оставляем в ширине только цифры (убираем px, % и т.д.)
            widthDigits = +width.replace(/\D/g, ''),
            slides = this[i].querySelectorAll('.carousel-item'),
            slidesField = this[i].querySelector('.carousel-slides'),
            dots = this[i].querySelectorAll('.carousel-indicators li');


        // ширина обертки равна общей ширине всех слайдов
        slidesField.style.width = 100 * slides.length + '%';
        // устанавливаем ширину всех слайдов равной ширине самого слайдера
        slides.forEach(slide => {
            slide.style.width = width;
        });

        let offset = 0;
        let slideIndex = 0;

        // класс активности для первой точки
        dots[slideIndex].classList.add('active');

        const nextSlide = function() {
            if (offset == (widthDigits * (slides.length - 1))) {
                offset = 0;
            } else {
                offset += widthDigits;
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex += 1;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        };

        // обработка клика вперед
        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();

            nextSlide();
            
        });

        // обработка клика назад
        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();

            if (offset == 0) {
                offset = widthDigits * (slides.length - 1);
            } else {
                offset -= widthDigits;
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex -= 1;
            }

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        // обработка кликов по дотсам
        const sliderId = $(this[i]).getAttr('id');
        $(`#${sliderId} .carousel-indicators li`).click((e) => {
           
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = +slideTo;
            offset = widthDigits * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
        });

        // Автоперелистывание слайдера, если задан аргумент
        if (autoplay) {
            setInterval(() => {
                nextSlide();
            }, autoplayInterval);
        }
    }
};

$('.carousel').carousel(true, 2000);


// Динамическое создание слайдера-карусели
$.prototype.createSlider = function({slides, settings} = {}) {
    for (let i = 0; i < this.length; i++) {

        $(this[i]).addClass('carousel');

        // создаем массив слайдов и точек (количество слайдов, пути к ним и альты задаются в настройках)
        const slds = [],
            dots = [];
        for (let j = 0; j < slides.count; j++) {
            let sld = document.createElement('div');
            sld.classList.add('carousel-item');
            sld.innerHTML = `
                <img src="${slides.settings[j][0]}" alt="${slides.settings[j][1]}">
            `;
            slds.push(sld);

            let dot = document.createElement('li');
            dot.setAttribute('data-slide-to', j);
            dots.push(dot);
        }

        // основаная HTML структура слайдера
        $(this[i]).html(`
            <div class="ol carousel-indicators">
                
            </div>
            <div class="carousel-inner">
                <div class="carousel-slides">
                    
                </div>
            </div>
            <a href="#" class="carousel-prev" data-slide="prev">
                <span class="carousel-prev-icon">&lt;</span>
            </a>
            <a href="#" class="carousel-next" data-slide="next">
                <span class="carousel-prev-icon">&gt;</span>
            </a>
        `);

        // добавляем в нужное место созданный ранее массив со слайдами
        $(this[i]).find('.carousel-slides')[0].append(...slds);

        // Добавляем дотсы (в зависимости от количества слайдов)
        $(this[i]).find('.carousel-indicators')[0].append(...dots);

        // применяем механизм слайдера для статической верстки на только что созданную динамически структуру
        $(this[i]).carousel(settings.autoplay, settings.autoplayInterval);
    }
};

