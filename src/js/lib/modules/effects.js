import $ from '../core';

// Запуск анимации. Аргументы: длительность; колбэк, который сработает после запуска анимации; функция, которая запустится после того, как анимация отработала. Аргументы необязательные
$.prototype.animateOverTime = function(dur, cb, fin) {
    let timeStart;

    // техническая функция. Будет запускаться через интервал времени, который определяет браузер
    function _animateOverTime(time) {
        // При первом запуске функции в timeStart будет записано первое значение time
        if (!timeStart) {
            timeStart = time;
        }

        // Прошедшее время с каждым новым запуском функции будет увеличиваться
        let timeElapsed = time - timeStart;

        // Для анимации будет использоваться Opacity. Ее значение от 0 до 1. Со временем значение complection будет расти как раз от 0 до 1. Можно будет использовать другие параметры, для которых требуется изменение со временем (размер, смещение и т.д.)
        let complection = Math.min(timeElapsed / dur, 1);

        cb(complection);

        // анимация продолжается до достижения времени dur. По окончании анимации запускается функция fin (необязательная)
        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') {
                fin();
            }
        }
    }

    return _animateOverTime;
};



// Анимация появления элемента
$.prototype.fadeIn = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        // Для начала покажем объект (по-умолчанию block)
        this[i].style.display = display || 'block';

        // техническая функция, меняющая прозрачность на основе complection
        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };
 
        // запуск анимации на основе функции animateOverTime
        const ani = this.animateOverTime(dur, _fadeIn, fin);
        requestAnimationFrame(ani);
    }
    return this;
};


// Анимация скрытия элемента
$.prototype.fadeOut = function(dur, fin) {
    for (let i = 0; i < this.length; i++) {

        // техническая функция, меняющая прозрачность на основе complection
        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;
            // в итоге полностью скрываем элемент
            if (complection === 1) {
                this[i].style.display = 'none';
            }
        };
 
        // запуск анимации на основе функции animateOverTime
        const ani = this.animateOverTime(dur, _fadeOut, fin);
        requestAnimationFrame(ani);
    }
    return this;
};



// Вариант Петриченко
// $.prototype.fadeToggle = function(dur, display, fin) {
//     for (let i = 0; i < this.length; i++) {
//         if (window.getComputedStyle(this[i]).display === 'none') {
//             // далее копия метода fadeIn
//             this[i].style.display = display || 'block';

//             const _fadeIn = (complection) => {
//                 this[i].style.opacity = complection;
//             };
    
//             const ani = this.animateOverTime(dur, _fadeIn, fin);
//             requestAnimationFrame(ani);
//         } else {
//             // копия метода fadeOut
//             const _fadeOut = (complection) => {
//                 this[i].style.opacity = 1 - complection;
//                 if (complection === 1) {
//                     this[i].style.display = 'none';
//                 }
//             };
     
//             const ani = this.animateOverTime(dur, _fadeOut, fin);
//             requestAnimationFrame(ani); 
//         }
//     }
//     return this;
// };



// Мой вариант
$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        let disp = getComputedStyle(this[i]).getPropertyValue('display');
        if (disp == 'none') {
            $(this[i]).fadeIn(dur, display, fin);
        } else {
            $(this[i]).fadeOut(dur, fin);
        }
    }
    return this;
};




