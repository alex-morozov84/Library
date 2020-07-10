import $ from '../core';

// Если что-то передано, то это записывается внутрь элемента в виде HTML. Если ничего не передано, то получаем контент внутри элемента
$.prototype.html = function(content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};

// Получаем конкретный элемент по его номеру
$.prototype.eq = function(i) {
    // Нам требуется очистить объект this от всех свойств, кроме того, которое нас интересует

    const swap = this[i];
    // получаем количество всех свойств объекта (у него кроме всех элементов могут быть еще длина и т.д.)
    const objLength = Object.keys(this).length;

    // полностью очищаем объект
    for (let i = 0; i < objLength; i++) {
        delete this[i];
    }

    // формируем объект из нашего элемента
    this[0] = swap;
    this.length = 1;

    return this;
};

// Возвращает порядковый номер элемента относительно его родителя
$.prototype.index = function() {
    const parent = this[0].parentNode;
    // для того, чтобы далее работал метод findIndex, преобразуем HTML коллекцию дочерних элементов в массив
    const childs = [...parent.children];
    
    // функция возвращает искомый элемент
    const findMyIndex = (item) => {
        return item == this[0];
    };

    // получаем номер требуемого элемента
    return childs.findIndex(findMyIndex);

};

// Поиск элементов по требуемому селектору (внутри указанного элемента)
$.prototype.find = function(selector) {
    let numberOfItems = 0,
        counter = 0;

    // создаем поверхностную копию объекта
    const copyObj = Object.assign({}, this);
    // по всему объекту ищем элементы с требуемым селектором и записываем их в arr
    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) {
            continue;
        }

        // записываем найденные элементы в объект (т.е. перезаписываем то, что в нем уже содержится)
        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }

        numberOfItems += arr.length;
    }

    this.length = numberOfItems;

    // После перезаписи элементов в объекте, в нем может остаться "хвост" из старых элементов. Их надо удалить
    // получаем количество всех свойств объекта (у него кроме всех элементов могут быть еще длина и т.д.)
    const objLength = Object.keys(this).length;

    // удаляем все свойства с номерами от numberOfItems
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;

};


// Поиск ближайшего блока по заданному селектору. Аналог closest, но этот метод ищет closest для всех записанных в this элементов
$.prototype.closest = function(selector) {
    // подсчет количества найденных элементов
    let counter = 0;

    // для каждого свойства (элемента) находим closest и записываем в объект
    for (let i = 0; i < this.length; i++) {

        // если элемент не найден, то будет записано null. Тогда может возникнуть ошибка, если далее назначить элементу class или еще что. Чтобы этого избежать, ставим условие
        if (this[i].closest(selector) === null) {
            return this;
        } else {
            this[i] = this[i].closest(selector);
            counter++;
        }
        
    }

    const objLength = Object.keys(this).length;

    // удаляем все свойства с номерами от counter (т.е. те, которые не используют метод .closest)
    for (; counter < objLength; counter++) {
        delete this[counter];
    }

    return this;
};



// Поиск всех соседних элементов внутри родителя, не включая сам элемент
$.prototype.siblings = function() {
    let numberOfItems = 0,
        counter = 0;

    // создаем поверхностную копию объекта
    const copyObj = Object.assign({}, this);
    // по всему объекту ищем детей родительского элемента
    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;

        // записываем найденные элементы в объект (т.е. перезаписываем то, что в нем уже содержится)
        for (let j = 0; j < arr.length; j++) {
            // удаляем элемент, относительно которого производим поиск (он в выборку не влкючается)
            if (copyObj[i] === arr[j]) {
                continue;
            }

            this[counter] = arr[j];
            counter++;
        }

        // общее количество на 1 меньше, т.к. вычли сам элемент, на котором производим поиск
        numberOfItems += arr.length - 1;
    }

    this.length = numberOfItems;

    // После перезаписи элементов в объекте, в нем может остаться "хвост" из старых элементов. Их надо удалить
    // получаем количество всех свойств объекта (у него кроме всех элементов могут быть еще длина и т.д.)
    const objLength = Object.keys(this).length;

    // удаляем все свойства с номерами от numberOfItems
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;

};
