import $ from "jquery";

/* Каталог */

let catalogMenu = $('#catalog-menu');
let btnOpenCatalog = $('.open-catalog-js');
let btnCloseCatalog = $('.close-catalog-js');
let userMenu = $('#user-menu');

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

/* end Каталог */