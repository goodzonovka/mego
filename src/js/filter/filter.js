import $ from "jquery";
import "./slider.js";

let btnOpenFilter = $('#filter-btn-open');
let btnCloseFilter = $('.close-filter-js');
let filter = $('#filter');
let btnBrandsViewAll = $('#filter-brands-view-all');
let filterBrandsInput = $('#filter-brands-input');
let brandsList = $('#filter-brands-list');
let filterBrandsItems = brandsList.find('.input-checkbox__label');
let filterTitleToggle = $('.filter-title-toggle-js');
let btnFilterReset = $('#filter-reset');
let applyBlock = $('#filter-apply-block-js')
let filterContent = $('#filter-content')

// открытие формы
btnOpenFilter.click(openFilter);

// закрытие формы
btnCloseFilter.click(closeFilter);

// раскрыть/скрыть бренды
btnBrandsViewAll.click(brandsViewAll);

// поиск по брендам
filterBrandsInput.on('input', filterBrandsSearch);

// раскрыть/скрыть блок с фильтром по клику на title
filterTitleToggle.click(filterBlockToggle);

// сброс формы
btnFilterReset.click(filterReset);

// отобразить кнопку "применить", если в форме что-то изменилось
filter.find('input').not(filterBrandsInput).on('change input keypress', displayApplyBtn)

function openFilter() {
    filter.addClass('active');
    $('body').addClass('overflow-hidden');
}

function closeFilter() {
    filter.removeClass('active');
    $('body').removeClass('overflow-hidden');
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
    hideApplyBtn();
}

function displayApplyBtn() {
    applyBlock.show();
    filterContent.addClass('padding-for-apply')
}

function hideApplyBtn() {
    applyBlock.hide();
    filterContent.removeClass('padding-for-apply')
}