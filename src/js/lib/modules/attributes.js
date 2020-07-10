import $ from '../core';

$.prototype.setAttr = function(attrName, attrValue) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].setAttribute) {
            continue;
        }
        this[i].setAttribute(attrName, attrValue);
    }

    return this;
};

$.prototype.removeAttr = function(attrName) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].removeAttribute) {
            continue;
        }
        this[i].removeAttribute(attrName);
    }

    return this;
};

$.prototype.toggleAttr = function(attrName) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].hasAttribute) {
            continue;
        }

        if (this[i].hasAttribute(attrName)) {
            this[i].removeAttribute(attrName);
        } else {
            this[i].setAttribute(attrName, '');
        }
    }
    return this;
};

$.prototype.getAttr = function(attrName) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].getAttribute) {
            continue;
        }
        return this[i].getAttribute(attrName);
    }
    return this;
};