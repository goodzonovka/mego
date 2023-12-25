import $ from "jquery";

/* добавление в сравнение из preview товара и отображение счетчиков */
let counterComparison = 0;
let counterComparisonItem = $('.counter-comparison-js');

$(document).on('click', '.compare-js', function () {
    let svgComparisonUse = $(this).find('svg use');
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        svgComparisonUse.attr('href', 'https://goodzonovka.github.io/mego-production/images/icons/icons.svg#compare-fill');
        counterComparison++;
    } else {
        svgComparisonUse.attr('href', 'https://goodzonovka.github.io/mego-production/images/icons/icons.svg#compare');
        counterComparison--;
    }

    if (counterComparison === 0) {
        counterComparisonItem.text('');
    }
    if (counterComparison > 0) {
        counterComparisonItem.text(counterComparison);
    }
});
/* end добавление в сравнение из preview товара и отображение счетчиков */