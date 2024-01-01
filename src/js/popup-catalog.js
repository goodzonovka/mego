import $ from "jquery";
import {isDesktop} from "./functions.js";

/* Popup Каталог */

let catalogMenu = $('#catalog-menu');
let btnOpenCatalog = $('.open-catalog-js');
let btnCloseCatalog = $('.close-catalog-js');
let userMenu = $('#user-menu');
let startX;

if (isDesktop()) {
    $('.catalog-menu:not(#catalog-menu) .catalog-menu-list').removeClass('catalog-menu-list');
    $('.catalog-menu:not(#catalog-menu) .catalog-menu-list__link').removeClass('catalog-menu-list__link');
    $('.catalog-menu:not(#catalog-menu) .catalog-menu__content').removeClass('catalog-menu__content');
    $('.catalog-menu:not(#catalog-menu) .catalog-menu__header').removeClass('catalog-menu__header');
    $('.catalog-menu:not(#catalog-menu)').removeClass('catalog-menu');

    $('.catalog-menu__content').addClass('container');
}

// toggle catalog
btnOpenCatalog.click(toggleCatalog);

// закрытие
btnCloseCatalog.click(closeCatalog);

if (isDesktop()) {
    // закрытие по клавише Esc
    $(document).keydown(closeCatalogByEsc)

    // закрыть вне клике на каталог или кнопку
    $(document).mouseup(function (e) {
        let catalogMenuContent = $('.catalog-menu__content'),
            catalogBtnJs = $('.catalog-button-js');

        if ( !catalogMenuContent.is(e.target) && catalogMenuContent.has(e.target).length === 0 &&
            !catalogBtnJs.is(e.target) && catalogBtnJs.has(e.target).length === 0 &&
            $('#catalog-menu').hasClass('active')
        ) {
            btnOpenCatalog.removeClass('active').find('svg use')
                .attr('href', 'images/icons/icons.svg#catalog');
            catalogMenu.removeClass('active');
            $('body').removeClass('overflow-hidden');
        }
    });
}

function toggleCatalog(e) {
    e.preventDefault();
    if (isDesktop()) {
        // открыть подкатегории 1 пункта каталога
        $('.catalog-menu-link-js').first().trigger('mouseenter');

        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $(this).find('svg use').attr('href', 'images/icons/icons.svg#close')
        } else {
            $(this).find('svg use').attr('href', 'images/icons/icons.svg#catalog')
        }
    }
    catalogMenu.toggleClass('active');
    $('body').toggleClass('overflow-hidden');
}

function closeCatalog() {
    catalogMenu.removeClass('active');

    if (!userMenu.hasClass('active')) {
        $('body').removeClass('overflow-hidden');
    }
}

function closeCatalogByEsc(e) {
    if (e.key === 'Escape' && catalogMenu.hasClass('active')) {
        btnOpenCatalog.removeClass('active').find('svg use').attr('href', 'images/icons/icons.svg#catalog');
        catalogMenu.removeClass('active');
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