import './lib/lib';
import $ from './lib/lib';

// Примеры использования созданных методов:

// $('button').addClass('on');
// $('button').removeClass('on');
// $('button').toggleClass('on');
// $('button').setAttr('number', 'one');
// $('button').removeAttr('number');
// console.log($('button').getAttr('number'));
// $('button').toggleAttr('number');
// $('button').hide();
// $('button').show();
// $('button').toggle();
// $('button').on('click', function() {
//     $('div').eq(2).toggleClass('active');
// });
// $('button').off('click', function() {
//     $('div').eq(2).toggleClass('active');
// });
// $('div').click(function() {
//     console.log($(this).index());
// });
// $('button').html('Hello');
// // console.log($('div').eq(2).find('.some'));
// // console.log($('.some').closest(".find_me").addClass('sdfsdf'));
// // console.log($('.more').eq(0).siblings());
// // console.log($('.find_me').siblings());
// $('button').fadeIn(1800);


// Работа со страницей (после создания библиотеки CSS-классов)

$('#first').on('click', () => {
    $('div').eq(1).fadeOut(800);
});

// $('[data-count="second"]').on('click', () => {
//     $('div').eq(2).fadeOut(800);
// });

$('[data-count="second"]').on('click', () => {
    $('div').eq(2).fadeToggle(800);
});

$('button').eq(2).on('click', () => {
    $('.w-500').fadeToggle(800);
});

// Инициализация выпдающего меню при статической верстке (Петриченко инициализирует прямо в components)
// $('.dropdown-toggle').dropdown();

// Инициализация выпдающего меню при динамической верстке
$('.wrap').html(
    `<div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton">Dropdown button</button>
    <div class="dropdown-menu" data-toggle-id="dropdownMenuButton">
        <a href="#" class="dropdown-item">Action</a>
        <a href="#" class="dropdown-item">Action2</a>
        <a href="#" class="dropdown-item">Action3</a>
    </div>
    </div>`
);
// Инициализация, примененная для статичной верстки не сработает, т.к. скрипт отработает еще до того, как динамичнеская верстка сформируется. Поэтому запускаем еще раз
$('.dropdown-toggle').dropdown();

// Инициализация динамического модального окна
$('#trigger').click(() => $('#trigger').createModal({
    text: {
        title: "Modal title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda consequuntur ducimus eum numquam iure cumque atque quasi impedit. Repellendus, voluptate! Similique doloribus voluptate mollitia temporibus assumenda impedit aut architecto."
    },
    btns: {
        count: 2,
        settings: [
            [
                "Close",
                ['btn-danger', 'mr-10'],
                true
            ],
            [
                'Save changes',
                ['btn-success'],
                false,
                () => {
                    alert('Данные сохранены');
                }
            ]
        ]
    }
}));