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
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let offsetTopForChangeMenu = 150;
    if (!$('.main-banner-js').length) {
        offsetTopForChangeMenu = 75;
    }

    if (isDevice()) {
        if (scrollTop > offsetTopForChangeMenu) {
            $('#header-top, #header-bottom').slideUp();
        } else {
            $('#header-top, #header-bottom').slideDown();
        }
    }
    if (isDesktop()) {
        if (scrollTop > offsetTopForChangeMenu) {
            $('.header').addClass('shortened');
            $('#header-bottom').slideUp();
        } else {
            $('.header').removeClass('shortened');
            $('#header-bottom').slideDown();
        }
    }
});
/* end header: fixed menu */