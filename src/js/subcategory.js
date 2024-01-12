import $ from "jquery";
import MatchHeight from "matchheight";
import {isDesktop, isDevice} from "./functions.js";

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
    if (isDevice()) {
        btnChangeViewProducts.addClass('list');
        btnChangeViewProductsIcon.attr('href', 'images/icons/icons.svg#catalog');
    } else {
        $('.subcategory-view__grid').removeClass('active');
        $('.subcategory-view__list').addClass('active');
    }
    productsList.addClass('list');
}

// изменить вид товаров сетка/список и сохранить значение в localStorage
btnChangeViewProducts.click(changeViewProducts);


function changeViewProducts() {
    if (isDevice()) {
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
    } else {
        let view = $(this).data('view');

        btnChangeViewProducts.removeClass('active');
        $(this).addClass('active');

        if (view === 'list') {
            productsList.addClass('list');
            localStorage.setItem('productsViewList', 'true');
        } else {
            productsList.removeClass('list');
            localStorage.setItem('productsViewList', 'false');
        }
    }
}