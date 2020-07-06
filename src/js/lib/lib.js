// В этом файле функция $ бует обогащаться различными методами. $ импортируется из core.js, а методы из других файлов. Потом $ со всеми методами экспортируется

import $ from './core';
import './modules/display';
import './modules/classes';
import './modules/actions';

export default $;