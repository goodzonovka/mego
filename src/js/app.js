import $ from "jquery";

import "./header.js";
import "./footer.js";
import "./user-menu.js";
import "./choice-language-and-city.js";
import "./common.js";

import "./mainPage.js";
import "./popup-catalog.js";
import "./popup-sub-catalog.js";

import "./search.js";

import "./subcategory.js";
import "./filter/filter.js";

import "./products/buy.js";
import "./products/wishlist.js";
import "./products/comparison.js";

import './productPage.js';
import './stockPage.js';
import './contactPage.js';
import './cartPage.js';
import './orderPage.js';
import './accountPage.js';
import './accountDiscountsOffersPage.js';
import './accountOrders.js';
import './login.js';
import  './showPassword.js';
import './phoneInputCountry.js';

/* проверка на поддержку webp формата */
import BaseHelpers from './helpers/BaseHelpers.js';
import {isDesktop} from "./functions.js";

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();
/* end проверка на поддержку webp формата */

let isDesktopResult = isDesktop();

// перезагрузить страницу, если юзер ресайзит
// экран с десктопа на девайс и наоборот
$(window).resize(function () {
    if (isDesktopResult && $(window).width() < 1200 || !isDesktopResult && $(window).width() > 1199) {
        $('body').hide();
        location.reload();
    }
})

window.onload = function () {
    $('body').addClass('load');
}
