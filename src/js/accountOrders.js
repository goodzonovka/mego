import $ from 'jquery';


$('.account-orders .order__top').click(function () {
    let item = $(this).closest('.order');
    item.toggleClass('active');
})

$('.show-more-orders-js').click(function () {
    let dataShowText = $(this).data('text-show');
    let dataHideText = $(this).data('text-hide');

    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).text(dataHideText);
    } else {
        $(this).text(dataShowText);
    }
})