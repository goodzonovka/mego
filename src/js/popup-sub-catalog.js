import $ from "jquery";
import {isDesktop, isDevice} from "./functions.js";

let catalogMenu = $('#catalog-menu');
let subCatalogMenu = $('#sub-catalog-menu');
let btnOpenSubCatalog = $('.catalog-menu-link-js');
let btnCloseSubCatalog = $('.close-sub-catalog-js');
let btnBackSubCatalog = $('#sub-catalog-menu-back');
let subCatalogContent = $('#sub-catalog-content');
let subCatalogTitle = $('#sub-catalog-menu-title');
let userMenu = $('#user-menu');
let startX;

if (isDesktop()) {
    catalogMenu.find('.catalog-menu__content').append(subCatalogMenu);
}


// открытие
if (isDesktop()) {
    btnOpenSubCatalog.mouseenter(openSubCatalog);
} else {
    btnOpenSubCatalog.click(openSubCatalog);

    // раскрытие подкатегорий
    $(document).on('click', '.sub-catalog-menu-list__link', disclosureSubcategories)
}

// закрытие
btnCloseSubCatalog.click(closeSubCatalog)

// вернуться назад
btnBackSubCatalog.click(backSubCatalog);

// закрытие по touch событию вправо
subCatalogMenu.on('touchstart', getStartX);

subCatalogMenu.on('touchmove', closingBySwipe);

// end закрытие по touch событию вправо

function openSubCatalog(e) {
    let categoryId = $(this).data('id');

    if ($(this).hasClass('active')) return;

    $.ajax({
        url: "data/categories.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let category = getCategoryById(data, categoryId);
            let brands = getBrandsByCategoryId(data, categoryId);
            let subcategories = getSubcategoriesByCategoryId(data, categoryId);

            subCatalogContent.empty();

            if (category) {
                displayCategoryTitle(category);
            }

            if (subcategories) {
                if (isDevice()) {
                    displaySubcategoriesMobile(subcategories);
                }
                if (isDesktop()) {
                    displaySubcategoriesDesktop(subcategories);
                }
            }

            if (brands.length) {
                displayBrands(brands);
            }

            // console.log($('.sub-catalog-menu__header').outerHeight(true));
            // console.log($('.sub-catalog-menu-list__columns').outerHeight());

            if (isDesktop()) {
                checkScroll();
            }
        },
        error: function (xhr, status, error) {
            console.error("Ошибка загрузки данных: " + error);
        }
    });

    e.preventDefault();
    btnOpenSubCatalog.removeClass('active')
    $(this).addClass('active');
    subCatalogMenu.addClass('active');
}

if (isDesktop()) {
    $(window).resize(function () {
        checkScroll()
    })
}

// нужен ли скролл
function checkScroll() {
    if ($('#sub-catalog-menu').outerHeight() < $('.sub-catalog-menu__header').outerHeight(true) + $('.sub-catalog-menu-list__columns').outerHeight()) {
        $('#sub-catalog-menu').addClass('with-scroll');
    } else {
        $('#sub-catalog-menu').removeClass('with-scroll');
    }
}

// закрыть подкаталог
function closeSubCatalog() {
    catalogMenu.removeClass('active');
    subCatalogMenu.removeClass('active');
    btnOpenSubCatalog.removeClass('active');

    if (!userMenu.hasClass('active')) {
        $('body').removeClass('overflow-hidden');
    }
}

function getStartX(e) {
    startX = e.originalEvent.touches[0].pageX;
}

function closingBySwipe(e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100) {
        $(this).removeClass('active');
        btnOpenSubCatalog.removeClass('active');
    }
}

// вернуться назад
function backSubCatalog() {
    subCatalogMenu.removeClass('active');
    btnOpenSubCatalog.removeClass('active');
}

// раскрытие подкатегорий
function disclosureSubcategories(e) {
    e.preventDefault();
    e.stopPropagation();

    let itemLi = $(this).closest('.sub-catalog-menu-list__item');
    let subcategoriesUl = itemLi.find('ul');

    itemLi.siblings('li').removeClass('active').find('ul').slideUp(300);

    itemLi.toggleClass('active');
    subcategoriesUl.slideToggle(300);
}

// получить категорию по Id
function getCategoryById(jsonData, categoryId) {
    let category = jsonData.find(function (cat) {
        return cat.id === categoryId;
    });

    return category ? category : null;
}

// получить подкатегории по id категории 1-го уровня
function getSubcategoriesByCategoryId(jsonData, categoryId) {
    let category = jsonData.find(function (cat) {
        return cat.id === categoryId;
    });

    return category ? category.subcategories : null;
}

// получить бренды по id категории 1-го уровня
function getBrandsByCategoryId(jsonData, categoryId) {
    let category = jsonData.find(function (cat) {
        return cat.id === categoryId;
    });

    return category ? category.brands : null;
}

// отобразить title категории
function displayCategoryTitle(category) {
    let categoryTitle = category.name;

    subCatalogTitle.empty().append(`
        <a href="category.html">${categoryTitle}</a>
    `);
}


// отобразить категории 2го уровня для мобильной версии
function displaySubcategoriesMobile(subcategories) {
    let subcategoriesList = $('<ul class="sub-catalog-menu-list">');
    subcategories.forEach(function (subcategory) {
        let subcategoryElement = $('<li class="sub-catalog-menu-list__item">');

        subcategoryElement.append(`
            <a href="subcategory.html" class="catalog-menu-list__link sub-catalog-menu-list__link">
                <span class="sub-catalog-menu-list__title">${subcategory.name}</span>
                <button class="sub-catalog-menu-list__arrow sub-catalog-menu-list-arrow-js" aria-label="Раскрыть подменю">
                    <svg width="18" height="18">
                        <use href="images/icons/icons.svg#chevron-right-small"></use>
                    </svg>
                </button> 
            </a>
        `);

        // если у подкатегории есть подкатегории
        if (subcategory.subcategories) {
            displayNestedSubcategories(subcategoryElement, subcategory.subcategories);
        }
        subcategoriesList.append(subcategoryElement)
    });
    subCatalogContent.append(subcategoriesList);
}

// отобразить категории 2го уровня для десктопной версии
function displaySubcategoriesDesktop(subcategories) {
    let subcategoriesList = $('<div class="sub-catalog-menu-list__columns">');

    let column_1 = $('<div class="sub-catalog-menu-list__column">');
    let column_2 = $('<div class="sub-catalog-menu-list__column">');
    let column_3 = $('<div class="sub-catalog-menu-list__column">');

    let columnNumber = 1;
    subcategories.forEach(function (subcategory, index) {

        let subcategoryElement = $('<div class="sub-catalog-menu-list__item">');

        subcategoryElement.append(`
            <a href="subcategory.html" class="sub-catalog-menu-list__link">
                <span class="sub-catalog-menu-list__title">${subcategory.name}</span>
            </a>
        `);

        // если у подкатегории есть подкатегории
        if (subcategory.subcategories) {
            displayNestedSubcategories(subcategoryElement, subcategory.subcategories);
        }

        if (columnNumber === 1) {
            column_1.append(subcategoryElement);
        }
        if (columnNumber === 2) {
            column_2.append(subcategoryElement);
        }
        if (columnNumber === 3) {
            column_3.append(subcategoryElement);
        }
        columnNumber++;
        if (columnNumber === 4) columnNumber = 1;
    });
    subcategoriesList.append(column_1, column_2, column_3);
    subCatalogContent.append(subcategoriesList);
}

// отобразить категории 3го уровня
function displayNestedSubcategories(subcategoryElement, subcategories) {
    let nestedSubcategoriesList = $('<ul>');
    let moreLang = subCatalogContent.data('lang-more')

    subcategories.forEach(function (subcategory) {
        let nestedSubcategoryElement = $('<li>');
        nestedSubcategoryElement.append(`
                    <a href="subcategory.html">${subcategory.name}</a>
                `);
        nestedSubcategoriesList.append(nestedSubcategoryElement);
    });

    // Если подкатегорий больше 6, добавить кнопку "Ещё" и скрыть лишние подкатегории
    if (subcategories.length > 6) {
        nestedSubcategoriesList.addClass('subcategories-hidden')
        nestedSubcategoriesList.append(`
            <li class="sub-catalog-menu-list__more-wrap">
                <button class="sub-catalog-menu-list__more" onclick="showMoreSubcategories(this)">
                    <span>${moreLang}</span>
                     <svg width="18" height="18">
                        <use href="images/icons/icons.svg#chevron-down-small"></use>
                    </svg>
                </button>
            </li>
        `)
    }

    subcategoryElement.append(nestedSubcategoriesList)
}

function displayBrands(brands) {
    let brandsWrapper = $('<div class="sub-catalog-menu-brands">');

    brands.forEach(function (brand) {
        brandsWrapper.append(`
            <div class="sub-catalog-menu-brands__item">
                <a href="#">
                    <img src=${brand} alt="">
                </a>
            </div>
        `);
    })

    subCatalogContent.append(brandsWrapper);
}

// показать больше подкатегорий по клику на кнопку "Ещё"
function showMoreSubcategories(button) {
    let showMoreBtn = $(button);
    let langMore = subCatalogContent.data('lang-more');
    let langCollapse = subCatalogContent.data('lang-collapse');

    showMoreBtn.toggleClass('active');
    showMoreBtn.closest('ul').toggleClass('subcategories-hidden');

    if (showMoreBtn.hasClass('active')) {
        showMoreBtn.find('span').text(langCollapse)
    } else {
        showMoreBtn.find('span').text(langMore)
    }

    if (isDesktop()) {
        checkScroll();
    }
}

window.showMoreSubcategories = showMoreSubcategories;