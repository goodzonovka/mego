import $ from "jquery";
import Swiper from "swiper";


let catalogMenu = $('#catalog-menu');
let subCatalogMenu = $('#sub-catalog-menu');
let btnOpenSubCatalog = $('.catalog-menu-link-js');
let btnCloseSubCatalog = $('.close-sub-catalog-js');
let btnBackSubCatalog = $('#sub-catalog-menu-back');
let subCatalogContent = $('#sub-catalog-content');
let subCatalogTitle = $('#sub-catalog-menu-title');
let userMenu = $('#user-menu');

$(document).ready(function () {

    // открытие
    btnOpenSubCatalog.click(openSubCatalog);

    // закрытие
    btnCloseSubCatalog.click(closeSubCatalog)

    // вернуться назад
    btnBackSubCatalog.click(backSubCatalog);
});

function openSubCatalog(e) {
    let categoryId = $(this).data('id');

    $.ajax({
        url: "/data/categories.json",
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

            if (brands.length) {
                displayBrands(brands);

                subCategoryBrandsSwiper();
            }

            if (subcategories) {
                displaySubcategories(subcategories);
            }
        },
        error: function (xhr, status, error) {
            console.error("Ошибка загрузки данных: " + error);
        }
    });

    e.preventDefault();
    subCatalogMenu.addClass('active');
}

// закрыть подкаталог
function closeSubCatalog() {
    catalogMenu.removeClass('active');
    subCatalogMenu.removeClass('active');

    if (!userMenu.hasClass('active')) {
        $('body').removeClass('overflow-hidden');
    }
}

// вернуться назад
function backSubCatalog() {
    subCatalogMenu.removeClass('active');
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
        <a href="#">${categoryTitle}</a>
    `);
}


// отобразить категории 2го уровня
function displaySubcategories(subcategories) {
    let subcategoriesList = $('<ul class="sub-catalog-menu__list">');
    subcategories.forEach(function (subcategory) {
        let subcategoryElement = $('<li class="sub-catalog-menu__item">');

        subcategoryElement.append(`
            <a href="#" class="sub-catalog-menu__link">${subcategory.name}</a>
        `);

        // если у подкатегории есть подкатегории
        if (subcategory.subcategories) {
            displayNestedSubcategories(subcategoryElement, subcategory.subcategories);
        }
        subcategoriesList.append(subcategoryElement)
    });
    subCatalogContent.append(subcategoriesList);
}

// отобразить категории 3го уровня
function displayNestedSubcategories(subcategoryElement, subcategories) {
    let nestedSubcategoriesList = $('<ul>');
    let moreLang = subCatalogContent.data('lang-more')

    subcategories.forEach(function (subcategory) {
        let nestedSubcategoryElement = $('<li>');
        nestedSubcategoryElement.append(`
                    <a href="#">${subcategory.name}</a>
                `)
        nestedSubcategoriesList.append(nestedSubcategoryElement);
    });

    // Если подкатегорий больше 6, добавить кнопку "Ещё" и скрыть лишние подкатегории
    if (subcategories.length > 6) {
        nestedSubcategoriesList.addClass('subcategories-hidden')
        nestedSubcategoriesList.append(`
            <li class="sub-catalog-menu__more-wrap">
                <button class="sub-catalog-menu__more" onclick="showMoreSubcategories(this)">
                    <span>${moreLang}</span>
                     <svg width="18" height="18">
                        <use href="/images/icons/icons.svg#chevron-down-small"></use>
                    </svg>
                </button>
            </li>
        `)
    }

    subcategoryElement.append(nestedSubcategoriesList)
}

function displayBrands(brands) {
    let brandsWrapper = $(`
        <div class="sub-catalog-menu__brands sub-catalog-menu-brands-js">
            <div class="swiper-wrapper"></div>
        </div>
    `)

    brands.forEach(function (brand) {
        brandsWrapper.find('.swiper-wrapper').append(`
            <div class="swiper-slide">
                <a href="#">
                    <img src=${brand} alt="">
                </a>
            </div>
        `);
    })

    subCatalogContent.append(brandsWrapper);
}

// подключения swiper для брендов в подкатегории
function subCategoryBrandsSwiper() {
    new Swiper('.sub-catalog-menu-brands-js', {
        slidesPerView: "auto",
        spaceBetween: 16,
    });
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
}

window.showMoreSubcategories = showMoreSubcategories;