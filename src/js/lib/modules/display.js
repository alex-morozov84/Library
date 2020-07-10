import $ from '../core';

$.prototype.show = function() {
    for (let i = 0; i < this.length; i++) {
        // обработаем ошибку, если у элмента нет стиля (просто пропустим его)
        if (!this[i].style) {
            continue;
        }
        this[i].style.display = 'block';
    }
    return this;
};

$.prototype.hide = function() {
    for (let i = 0; i < this.length; i++) {

        if (!this[i].style) {
            continue;
        }
        this[i].style.display = 'none';
    }
    return this;
};

$.prototype.toggle = function() {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].style) {
            continue;
        }

        if (this[i].style.display == 'none') {
            this[i].style.display = ''; 
        } else {
            this[i].style.display = 'none';  
        }
      
    }
    return this;
};