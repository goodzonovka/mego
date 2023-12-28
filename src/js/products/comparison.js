import $ from "jquery";

let counterComparison = 0;
let counterComparisonItem = $('.counter-comparison-js');

$(document).on('click', '.compare-js', function () {
    let svgComparisonUse = $(this).find('svg use');
    $(this).toggleClass('active');

    // изменение иконки и счетчика
    if ($(this).hasClass('active')) {
        svgComparisonUse.attr('href', 'images/icons/icons.svg#compare-fill');
        counterComparison++;
    } else {
        svgComparisonUse.attr('href', 'images/icons/icons.svg#compare');
        counterComparison--;
    }

    // изменение счетчиков
    if (counterComparison === 0) {
        counterComparisonItem.text('');
    }
    if (counterComparison > 0) {
        counterComparisonItem.text(counterComparison);
    }

    // Если карточка товара, то меняем текст
    $(this).hasClass('product-compare-js') && productChangeText(this);
});

function productChangeText(btnComparison) {
    let btn = $(btnComparison);

    let textAdd = btn.data('text-add');
    let textRemove = btn.data('text-remove');

    if (btn.hasClass('active')) {
        btn.find('.text').text(textRemove)
    } else {
        btn.find('.text').text(textAdd)
    }
}