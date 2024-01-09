import $ from 'jquery';

$('.show-more-offers-js').click(function () {
    let dataShowText = $(this).data('text-show');
    let dataHideText = $(this).data('text-hide');

    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).text(dataHideText);
    } else {
        $(this).text(dataShowText);
    }
});