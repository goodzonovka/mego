import $ from "jquery";
import Swiper from "swiper";
import {isDesktop} from "./functions.js";

let searchPopup = $('#search-popup');
let btnOpenSearchPopup = $('#open-search-popup');
let btnCloseSearchPopup = $('.close-search-js');

let btnOpenSearchCategoriesFilter = $('#search-open-category-filter');
let searchFilterCategory = $('#search-filter-category');
let btnCloseSearchFilterCategory = $('.close-search-filter-category-js');
let btnSearchFilterCategoryBack = $('#search-filter-category-back');

let linkSearchFilterCategory = $('.search-filter-category-link-js');
let btnCancelSearchCategory = $('#search-form-select-category-cancel');


let startX;

if (isDesktop()) {
    $('#search-filter-category-popup .inner').append($('#search-filter-category-list'));
}


// открытие
btnOpenSearchPopup.click(openSearchPopup);

// закрытие
btnCloseSearchPopup.click(closeSearchPopup);

// закрытие по touch событию вправо
searchPopup.on('touchstart', getStartX);

searchPopup.on('touchmove', closingBySwipe);
// end закрытие по touch событию вправо

// открытие фильтра по категории
btnOpenSearchCategoriesFilter.click(openSearchCategoryFilter);

// закрытие фильтра
btnCloseSearchFilterCategory.click(closeSearchCategoryFilter);

// закрытие фильтра по touch событию вправо
searchFilterCategory.on('touchstart', getStartX);

searchFilterCategory.on('touchmove', closingBySwipe);
// end закрытие фильтра по touch событию вправо

// вернуться назад
btnSearchFilterCategoryBack.click(searchFilterCategoryBack)

// выбор категории в фильтре поиска
linkSearchFilterCategory.click(setSearchFilterCategory);

// подключение слайдера для популярных категорий
searchPopularCategoriesSlider();

// сбросить поиск по категориям
btnCancelSearchCategory.click(cancelSearchCategory);

function openSearchPopup() {
    searchPopup.addClass('active');
    $('body').addClass('overflow-hidden');
}

function closeSearchPopup() {
    searchPopup.removeClass('active');
    $('body').removeClass('overflow-hidden');
}

function getStartX(e) {
    startX = e.originalEvent.touches[0].pageX;
}

function closingBySwipe(e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100 && !$(e.target).closest('.search-popup-popular-categories-js:not(.disabled)').length) {
        $(this).removeClass('active');

        if ($(this).closest('#search-popup').length) {
            $('body').removeClass('overflow-hidden');
        }
    }
}

function searchPopularCategoriesSlider() {
    new Swiper('.search-popup-popular-categories-js', {
        slidesPerView: "auto",
        spaceBetween: 16,
        on: {
            init: function () {
                let totalWidth = 0;
                $(this.slides).each(function () {
                    totalWidth += $(this).outerWidth(true);
                });

                if (totalWidth <= $(this.el).width()) {
                    $(this.el).addClass('disabled');
                }
            }
        }
    });
}

function openSearchCategoryFilter() {
    searchFilterCategory.addClass('active');
}

function closeSearchCategoryFilter() {
    searchPopup.removeClass('active');
    searchFilterCategory.removeClass('active');
    $('body').removeClass('overflow-hidden');
}

function searchFilterCategoryBack() {
    searchFilterCategory.removeClass('active');
}

function setSearchFilterCategory(e) {
    e.preventDefault();

    let currentCategory = $('#search-form-current-category');

    linkSearchFilterCategory.removeClass('active');
    $(this).addClass('active');
    currentCategory.text($(this).find('.catalog-menu-list__title').text());

    if (isDesktop()) {
        $('#search-filter-category-popup').removeClass('active');
        $('body').removeClass('overflow-hidden');
    } else {
        searchFilterCategory.removeClass('active');
    }

    if (!$(this).hasClass('default')) {
        btnCancelSearchCategory.addClass('active');
        btnCancelSearchCategory.find('use').attr('href', 'images/icons/icons.svg#close');
    } else {
        btnCancelSearchCategory.removeClass('active');
        btnCancelSearchCategory.find('use').attr('href', 'images/icons/icons.svg#chevron-down-small');
    }

}

function cancelSearchCategory(e) {
    if ($(this).hasClass('active')) {
        e.stopPropagation();
    }
    $('.search-filter-category-link-js.default').trigger('click');
    $(this).removeClass('active').find('use').attr('href', 'images/icons/icons.svg#chevron-down-small');
}