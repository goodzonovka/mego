import $ from "jquery";

let sortButton = $('.sort-button-js');
let sortCurrent = $('.sort-current-js');
let sortDropdown = $('.sort-dropdown-js');
let sortLink = $('.sort-link-js');

// открытие dropdown
sortButton.click(openSortDropdown);

// при клике на ссылку меняем class active
// подставляем новый текст в кнопку
// закрывем dropdown
sortLink.click(setActiveLink);

// закрытие dropdown при клике вне области блока
$(document).mouseup(closingSortDropdownOutside);

function openSortDropdown() {
    sortDropdown.fadeToggle(300);
}

function setActiveLink(e) {
    e.preventDefault();

    let currentText = $(this).text();

    sortLink.removeClass('active');
    $(this).addClass('active');

    sortCurrent.text(currentText);

    sortDropdown.fadeOut(300);
}

function closingSortDropdownOutside(e) {
    if ( !sortDropdown.is(e.target) && sortDropdown.has(e.target).length === 0 &&
        !sortButton.is(e.target) && sortButton.has(e.target).length === 0
    ) {
        sortDropdown.fadeOut(300);
    }
}