import $ from "jquery";

/* Каталог */

let catalogMenu = $('#catalog-menu');
let btnOpenCatalog = $('.open-catalog-js');
let btnCloseCatalog = $('.close-catalog-js');
let userMenu = $('#user-menu');
let startX;

// открытие
btnOpenCatalog.click(openCatalog);

// закрытие
btnCloseCatalog.click(closeCatalog);


function openCatalog(e) {
    e.preventDefault();
    catalogMenu.addClass('active');
    $('body').addClass('overflow-hidden');
}

function closeCatalog() {
    catalogMenu.removeClass('active');

    if (!userMenu.hasClass('active')) {
        $('body').removeClass('overflow-hidden');
    }
}

// закрытие по touch событию вправо
catalogMenu.on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].pageX;
});

catalogMenu.on('touchmove', function (e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100) {
        $(this).removeClass('active');

        if (!userMenu.hasClass('active')) {
            $('body').removeClass('overflow-hidden');
        }
    }
});
// end закрытие по touch событию вправо

/* end Каталог */