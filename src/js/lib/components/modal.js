import $ from '../core';

// Работа со статическим модальным окном (из верстки)
$.prototype.modal = function(createdModal) {
    
    for (let i = 0; i < this.length; i++) {
        const modalID = $(this[i]).getAttr('data-target');
        $(this[i]).on('click', (e) => {
            e.preventDefault();
            $(modalID).fadeIn(500);
            document.body.style.overflow = 'hidden';

            // Проверка на наличие полосы прокрутки
            if (document.body.offsetHeight > document.documentElement.clientHeight) {
                // console.log('ok');
                // Отменяем сдвиг элементов страницы при появлении/исчезновении полосы прокрутки
                let scrollWidth = calcMoveX();
                document.body.style.marginRight = `${scrollWidth}px`;
                // сдвиг модального окна (чтоб не дергалось). На половину ширины полосы прокрутки, т.к оно находится в середине
                modalMove(-scrollWidth/2);
                document.body.style.marginRight = `${scrollWidth}px`;
            }
            
        });  

        let closeModal = (selector) => {
            $(selector).fadeOut(500);
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            modalMove();

            // Если модальное окно было создано динамически (если передан агрумент из метода создания динамической модалки), то оно удаляется из верстки после закрытия
            if (createdModal) {
                
                // Если удалить сразу, то пропадет эффект плавного исчезновения
                setTimeout(() => {
                    document.querySelector(selector).remove();
                }, 1000);
                createdModal = null;
            }
        };
    
        // Закрытие при клике на кристик
        $(`${modalID} [data-close]`).click(() => {
            closeModal(`${modalID}`);
        });
    
        // Закрытие при клике вне модального окна
        $('.modal').click((e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(`${modalID}`);
            }
        });

    }

    // Определение шиирны полосы прокрутки
    function calcMoveX() {
        let elem = document.createElement('div');
        elem.style.cssText = `
            width: 50px;
            height: 50px;
            visibility: hidden;
            overflow-y: scroll;
        `;
        document.body.append(elem);
        let scrollWidth = elem.offsetWidth - elem.clientWidth;
        elem.remove();
        return scrollWidth;
    }
    
    // сдвиг модального окна (чтоб не дергалось при появлении/исчезновении полосы прокрутки)
    // одно из окон все равно сдвигается после первого закрывания (надо потом разобраться =)
    function modalMove(move) {
        if (!move) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.transform = `TranslateX(0px)`;
            });
        } else {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.transform = `TranslateX(${move}px)`;
            });
        }
    }
};

// Инициализация запуска модальных окон
$('[data-toggle="modal"]').modal();



$.prototype.createModal = function({text, btns} = {}) {
    for (let i = 0; i < this.length; i++) {

        // Техническая переменная, которая означает, что окно создано динамически (в конце передается в метод создания статического окна, чтоб удилить его из верстки после закрытия)
        let createdModal = true;

        // создаем обертку модального окна
        let modal = document.createElement('div');
        $(modal).addClass('modal');
        // задаем модальному окну ID, соответстующий дата-атрубуту триггера (удаляем #)
        $(modal).setAttr('id', $(this[i]).getAttr('data-target').slice(1));

        // Создаем кнопки (все данные о них задаются в настройках метода)
        const buttons = [];
        for (let j = 0; j < btns.count; j++) {
            let btn = document.createElement('button');
            // список классов будет считываться из настроек. j - порядковый номер кнопки, 1 - classNames в настройках
            $(btn).addClass('btn', ...btns.settings[j][1]);
            btn.textContent = btns.settings[j][0];
            if (btns.settings[j][2]) {
                $(btn).setAttr('data-close', 'true');
            }
            if (btns.settings[j][3] && typeof(btns.settings[j][3]) === 'function') {
                $(btn).on('click', btns.settings[j][3]);
            }
            buttons.push(btn);
        }

        // внутренняя структура модального окна
        $(modal).html(`
            <div class="modal-dialog">
                <div class="modal-content">
                    <button class="close" data-close>
                        <span>&times;</span>
                    </button>
                    <div class="modal-header">
                        <div class="modal-title">
                            ${text.title}
                        </div>
                    </div>
                    <div class="modal-body">
                        ${text.body}
                    </div>
                    <div class="modal-footer">
                        
                    </div>
                </div>
            </div>
        `);

        // Помещаем массив кнопок (развернутый при помощи spread-оператора) в футер
        modal.querySelector('.modal-footer').append(...buttons);

        // помещаем модальное окно на страницу
        document.body.appendChild(modal);

        // Инициализируем при помощи метода для статической верстки
        $(this[i]).modal(createdModal);

        // Сразу же отображаем модальное окно
        $($(this[i]).getAttr('data-target')).fadeIn(500);

    }
};
