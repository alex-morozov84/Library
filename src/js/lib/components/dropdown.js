import $ from '../core';

$.prototype.dropdown = function() {
    for (let i = 0; i < this.length; i++) {
        // получаем id кнопки
        let id = $(this[i]).getAttr('id');
        $((this[i])).click(() => {
            // при клике тогглим именно то меню, которое соответсвует кнопке
            $(`[data-toggle-id="${id}"]`).fadeToggle(300);
        });
    }
};

// Можно инициализировать прямо здесь, а можно в main.js
// $('.dropdown-toggle').dropdown();