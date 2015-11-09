(function() {
    var loadCSS = require('./lib/loadCSS');
    var onScroll = require('./lib/onScroll');

    document.addEventListener('DOMContentLoaded', onDOMLoad);

    function onDOMLoad() {
        var headerElement = document.querySelector('.header');

        var btnMenu = document.getElementById('btnMenu')
        navbarMenu = document.getElementById('navbarMenu');

        window.addEventListener('scroll', function() {
            onScroll(headerElement);
        });
        btnMenu.addEventListener('click', onClicMenu);

        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css');
        loadCSS('https://fonts.googleapis.com/css?family=Lato|Montserrat');

        function onClicMenu(e) {
            navbarMenu.classList.toggle('header-menu-list--show');
        }
    }

}());
