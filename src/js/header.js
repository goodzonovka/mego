import $ from "jquery";
import Swiper from "swiper";
import {isDevice, isDesktop} from "./functions.js";

let headerLogo = $('.header__logo');
let headerButtons = $('.header__buttons');

let comparisonButton = $('.comparison-button-js');
let wishlistButton = $('.wishlist-button-js');
let cartButton = $('.cart-button-js');
let catalogButton = $('.catalog-button-js');
let searchForm = $('.search-form-js');

$(function() {
    if (isDevice()) {
        /* категории в шапке сайта */
        new Swiper('.header-categories-js', {
            slidesPerView: "auto",
            spaceBetween: 16
        });
        /* end категории в шапке сайта */
    }

    if (isDesktop()) {
        comparisonButton.addClass('header__button');
        wishlistButton.addClass('header__button');
        cartButton.addClass('header__button');

        headerButtons.prepend(comparisonButton, wishlistButton, cartButton)

        headerLogo.after(catalogButton);
        catalogButton.after(searchForm)
    }
});
/* header: fixed menu */

let prevScrollTop = $(window).scrollTop();
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let offsetTopForChangeMenu = 150;
    let offsetForToggleSearch = 600;
    let header = $('.header');

    if (!$('.main-banner-js').length) {
        offsetTopForChangeMenu = 75;
    }

    if (isDevice()) {
        if (scrollTop > prevScrollTop) {
            header.removeClass('show-search');
        } else {
            if (scrollTop > offsetTopForChangeMenu) {
                header.addClass('show-search');
            }
        }

        if (scrollTop > offsetTopForChangeMenu) {
            // header.addClass('hide-header');
            $('#header-top, #header-bottom').slideUp(400);
        } else {
            $('#header-top, #header-bottom').slideDown(400);
        }

        if (scrollTop > offsetForToggleSearch) {
            header.addClass('hide-header');
        } else {
            header.removeClass('hide-header');
        }

        prevScrollTop = scrollTop;
    }
    if (isDesktop()) {
        if (scrollTop > offsetTopForChangeMenu) {
            header.addClass('shortened');
            $('#header-bottom').slideUp();
        } else {
            header.removeClass('shortened');
            $('#header-bottom').slideDown();
        }
    }
});
/* end header: fixed menu */