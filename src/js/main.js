// import './lib/lib';
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

// $('#first').on('click', () => {
//     $('div').eq(1).fadeOut(800);
// });

// // $('[data-count="second"]').on('click', () => {
// //     $('div').eq(2).fadeOut(800);
// // });

// $('[data-count="second"]').on('click', () => {
//     $('div').eq(2).fadeToggle(800);
// });

// $('button').eq(2).on('click', () => {
//     $('.w-500').fadeToggle(800);
// });

// Инициализация выпдающего меню при статической верстке (Петриченко инициализирует прямо в components)
// $('.dropdown-toggle').dropdown();

// Инициализация выпдающего меню при динамической верстке
// $('.wrap').html(
//     `<div class="dropdown">
//     <button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton">Dropdown button</button>
//     <div class="dropdown-menu" data-toggle-id="dropdownMenuButton">
//         <a href="#" class="dropdown-item">Action</a>
//         <a href="#" class="dropdown-item">Action2</a>
//         <a href="#" class="dropdown-item">Action3</a>
//     </div>
//     </div>`
// );
// // Инициализация, примененная для статичной верстки не сработает, т.к. скрипт отработает еще до того, как динамичнеская верстка сформируется. Поэтому запускаем еще раз
// $('.dropdown-toggle').dropdown();

// // Инициализация динамического модального окна
// $('#trigger').click(() => $('#trigger').createModal({
//     text: {
//         title: "Modal title",
//         body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda consequuntur ducimus eum numquam iure cumque atque quasi impedit. Repellendus, voluptate! Similique doloribus voluptate mollitia temporibus assumenda impedit aut architecto."
//     },
//     btns: {
//         count: 2,
//         settings: [
//             [
//                 "Close",
//                 ['btn-danger', 'mr-10'],
//                 true
//             ],
//             [
//                 'Save changes',
//                 ['btn-success'],
//                 false,
//                 () => {
//                     alert('Данные сохранены');
//                 }
//             ]
//         ]
//     }
// }));

// $().get('https://jsonplaceholder.typicode.com/todos/1')
//     .then(res => console.log(res));


// Инициализация динамического слайдера
$('.dynamicCarousel').createSlider({
    slides: {
        count: 5,
        settings: [
            [
                "https://krot.info/uploads/posts/2020-01/1579388380_1-2.jpg",
                "photo1"
            ],
            [
                "https://img.golos.io/proxy/https://hermestravel.lv/wp-content/uploads/2016/05/phuket-min.jpg",
                "photo2"
            ],
            [
                "https://img3.akspic.ru/image/72818-liniya_gorizonta-otrazhenie-stolica-gorodskoj_rajon-vankuver-1920x1080.jpg",
                "photo3"
            ],
            [
                "https://cdn.pixabay.com/photo/2020/01/17/13/18/sheep-4772994_960_720.jpg",
                "sheep"
            ],
            [
                "https://cdn.pixabay.com/photo/2020/07/11/08/00/deer-5393082_960_720.jpg",
                "moose"
            ],
            [
                "https://cdn.pixabay.com/photo/2020/07/09/09/05/cat-5386372_960_720.jpg",
                "kitten"
            ]
        ]
    },
    settings: {
        autoplay: false,
        autoplayInterval: 3000
    }
});