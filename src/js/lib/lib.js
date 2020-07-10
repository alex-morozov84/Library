// В этом файле функция $ бует обогащаться различными методами. $ импортируется из core.js, а методы из других файлов. Потом $ со всеми методами экспортируется

import $ from './core';
import './modules/display';
import './modules/classes';
import './modules/handlers';
import './modules/attributes';
import './modules/actions';
import './modules/effects';
import './components/dropdown';
import './components/modal';
import './components/tabs';

export default $;