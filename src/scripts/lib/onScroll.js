var onScroll = function(elem) {
    Element.prototype.hasClass = function(className) {
        return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    };
    if (window.scrollY >= 240) {
        if (!elem.hasClass('header--light')) {
            elem.classList.add('header--light');
        }
    } else {
        if (elem.hasClass('header--light')) {
            elem.classList.remove('header--light');
        }
    }
}

module.exports = onScroll;
