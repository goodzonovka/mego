import $ from "jquery";
import "./slider.js";
import {isDevice} from "../functions.js";

let btnOpenFilter = $('#filter-btn-open');
let btnCloseFilter = $('.close-filter-js');
let filter = $('#filter');
let btnBrandsViewAll = $('#filter-brands-view-all');
let filterBrandsInput = $('#filter-brands-input');
let brandsList = $('#filter-brands-list');
let filterBrandsItems = brandsList.find('.input-checkbox__label');
let filterTitleToggle = $('.filter-title-toggle-js');
let btnFilterReset = $('#filter-reset');
let applyBlock = $('#filter-apply-block-js');
let filterContent = $('#filter-content');
let startX;

$('.filter-categories__list a:has(svg)').click(function (e) {
    if ($(this).find('+ ul > li > a').hasClass('current-category')) return;
    e.preventDefault();
    e.stopPropagation();

    let linkSvg = $(this).find('svg');

    if (linkSvg.hasClass('icon-right')) {
        linkSvg.removeClass('icon-right').addClass('icon-left');
        linkSvg.find('use').attr('href', 'images/icons/icons.svg#chevron-left-small');
    } else {
        linkSvg.removeClass('icon-left').addClass('icon-right');
        linkSvg.find('use').attr('href', 'images/icons/icons.svg#chevron-right-small');
    }

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp(300);
    } else {
        $(this).addClass('active');
        $(this).next().slideDown(300);
    }
});

// открытие формы
btnOpenFilter.click(openFilter);

// закрытие формы
btnCloseFilter.click(closeFilter);

// закрытие по touch событию вправо
// filter.on('touchstart', getStartX);
//
// filter.on('touchmove', closingBySwipe);

// раскрыть/скрыть бренды
btnBrandsViewAll.click(brandsViewAll);

// поиск по брендам
filterBrandsInput.on('input', filterBrandsSearch);

// раскрыть/скрыть блок с фильтром по клику на title
filterTitleToggle.click(filterBlockToggle);

// сброс формы
btnFilterReset.click(filterReset);

// отобразить кнопку "применить", если в форме что-то изменилось
if (isDevice()) {
    filter.find('input').not(filterBrandsInput).on('change input keypress', displayApplyBtn)
}

function openFilter() {
    filter.addClass('active');
    $('body').addClass('overflow-hidden');
}

function closeFilter() {
    filter.removeClass('active');
    $('body').removeClass('overflow-hidden');
}

function getStartX(e){
    startX = e.originalEvent.touches[0].pageX;
}

function closingBySwipe(e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100 && !$(e.target).closest('.slider').length) {
        filter.removeClass('active');
        $('body').removeClass('overflow-hidden');
    }
}

function brandsViewAll() {
    let textViewAll = $(this).data('text-view-all');
    let textHide = $(this).data('text-hide');

    $(this).toggleClass('active');
    brandsList.toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).text(textHide);
    } else {
        $(this).text(textViewAll);
    }
}

function filterBrandsSearch() {
    let searchText = $(this).val().toLowerCase();

    // Перебираем каждый элемент
    filterBrandsItems.each(function () {
        let brandName = $(this).find('.input-checkbox__value').text().toLowerCase();
        // Проверяем, содержится ли введенный текст в названии бренда
        if (brandName.indexOf(searchText) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    // скрыть кнопку "посмотреть все", если есть скролл у блока с брендами
    if (brandsList[0].scrollHeight > brandsList.innerHeight()) {
        btnBrandsViewAll.show();
    } else {
        btnBrandsViewAll.hide();
    }
}

function filterBlockToggle() {
    $(this).toggleClass('active');
}

function filterReset() {
    filter[0].reset();
    filter.find('.min-value, .max-value').each(function () {
        $(this).trigger('change');
    })
    if (isDevice()) {
        hideApplyBtn();
    }
}

function displayApplyBtn() {
    applyBlock.show();
    filterContent.addClass('padding-for-apply')
}

function hideApplyBtn() {
    applyBlock.hide();
    filterContent.removeClass('padding-for-apply')
}