import $ from "jquery";
import {isDesktop} from "./functions.js";

let pagination = $('#pagination');
let paginationButton = $('.pagination-button-js');
let paginationCurrent = $('.pagination-current-js');
let paginationDropdown = $('.pagination-dropdown-js');
let paginationLink = $('.pagination-link-js');

if (isDesktop()) {
    pagination.prepend($('.pagination__link'));
}

$('.pagination-prev-js, .pagination-next-js').click(function (e) {
    e.preventDefault();
})

// открытие dropdown
paginationButton.click(openSortDropdown);

// при клике на ссылку меняем class active
// подставляем новый текст в кнопку
// закрывем dropdown
paginationLink.click(setActiveLink);

// закрытие dropdown при клике вне области блока
$(document).mouseup(closingSortDropdownOutside);

function openSortDropdown() {
    paginationDropdown.fadeToggle(300);
}

function setActiveLink(e) {
    e.preventDefault();

    let currentText = $(this).text();

    paginationLink.removeClass('active');
    $(this).addClass('active');

    paginationCurrent.text(currentText);

    paginationDropdown.fadeOut(300);
}

function closingSortDropdownOutside(e) {
    if ( !paginationDropdown.is(e.target) && paginationDropdown.has(e.target).length === 0 &&
        !paginationButton.is(e.target) && paginationButton.has(e.target).length === 0
    ) {
        paginationDropdown.fadeOut(300);
    }
}