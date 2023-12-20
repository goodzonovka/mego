import $ from "jquery";
import Swiper from "swiper";

let searchPopup = $('#search-popup');
let btnOpenSearchPopup = $('#open-search-popup');
let btnCloseSearchPopup = $('.close-search-js');

let btnOpenSearchCategoriesFilter = $('#search-open-category-filter');
let searchFilterCategory = $('#search-filter-category');
let btnCloseSearchFilterCategory = $('.close-search-filter-category-js');
let btnSearchFilterCategoryBack = $('#search-filter-category-back');

let linkSearchFilterCategory = $('.search-filter-category-link-js');


// открытие
btnOpenSearchPopup.click(openSearchPopup);

// закрытие
btnCloseSearchPopup.click(closeSearchPopup);

// открытие фильтра по категории
btnOpenSearchCategoriesFilter.click(openSearchCategoryFilter);

// закрытие фильтра
btnCloseSearchFilterCategory.click(closeSearchCategoryFilter);

// вернуться назад
btnSearchFilterCategoryBack.click(searchFilterCategoryBack)

// выбор категории в фильтре поиска
linkSearchFilterCategory.click(setSearchFilterCategory);

// подключение слайдера для популярных категорий
searchPopularCategoriesSlider();

function openSearchPopup() {
    searchPopup.addClass('active');
    $('body').addClass('overflow-hidden');
}

function closeSearchPopup() {
    searchPopup.removeClass('active');
    $('body').removeClass('overflow-hidden');
}

function searchPopularCategoriesSlider() {
    new Swiper('.search-popup-popular-categories-js', {
        slidesPerView: "auto",
        spaceBetween: 16,
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
    linkSearchFilterCategory.removeClass('active');
    $(this).addClass('active');
}