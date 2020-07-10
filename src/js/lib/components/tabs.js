import $ from '../core';

// $.prototype.tabs = function() {
//     for (let i = 0; i < this.length; i++) {
//         const tabPanel = $(this[i]).find('[data-tabpanel]'),
//         tabTriggers = tabPanel.find('.tab-item'),
//         tabContent = $(this[i]).find('.tab-content');
//         for (let j = 0; j < tabTriggers.length; j++) {
            
//             $(tabTriggers[j]).on('click', () => {
//                 for (let k = 0; k < tabContent.length; k++) {
//                     $(tabContent[k]).removeClass('tab-content--active');
//                     $(tabTriggers[k]).removeClass('tab-item--active');
//                 }
//                 $(tabContent[j]).addClass('tab-content--active');
//                 $(tabTriggers[j]).addClass('tab-item--active');
//             });
//         }
//     }
// };

$.prototype.tabs = function() {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', () => {
            $(this[i])
                .addClass('tab-item--active')
                .siblings()
                .removeClass('tab-item--active')
                .closest('.tab')
                .find('.tab-content')
                .removeClass('tab-content--active')
                .eq($(this[i])
                .index())
                .addClass('tab-content--active');
        });
    }
};

$('[data-tabpanel] .tab-item').tabs();