import $ from "jquery";
import MatchHeight from "matchheight";
import {isDesktop} from "./functions.js";

let btnChangeViewProducts = $('.subcategory-view-js');
let btnChangeViewProductsIcon = btnChangeViewProducts.find('svg use');
let productsList = $('.products-list-js');
let subcategory = $('#subcategory');
let filter = $('#filter');


// перенос фильтра
if (isDesktop()) {
    subcategory.prepend(filter);
}


if (localStorage.getItem('productsViewList') === 'true') {
    btnChangeViewProducts.addClass('list');
    btnChangeViewProductsIcon.attr('href', 'images/icons/icons.svg#catalog');
    productsList.addClass('list');
}

// изменить вид товаров сетка/список и сохранить значение в localStorage
btnChangeViewProducts.click(changeViewProducts);


function changeViewProducts() {
    $(this).toggleClass('list');

    if ($(this).hasClass('list')) {
        btnChangeViewProductsIcon.attr('href', 'images/icons/icons.svg#catalog');
        productsList.addClass('list');
        localStorage.setItem('productsViewList', 'true');
    } else {
        btnChangeViewProductsIcon.attr('href', 'images/icons/icons.svg#grid');
        productsList.removeClass('list');
        localStorage.setItem('productsViewList', 'false');
    }
    new MatchHeight('.product-item .price-block');
}