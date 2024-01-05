import $ from 'jquery';
import {isDesktop} from "./functions.js";
import {openPopup} from "./choice-language-and-city.js";

openPopup('#product-changes');

if (isDesktop()) {
    $('.cart__sidebar').append($('.cart-order-block-js'));

    $('.cart__present').each(function () {
        $(this).find('.status-list, .title').wrapAll('<div class="status-list-title-wrap">');
    })
}
$('.cart-checkbox-js').change(function () {
    checkActiveCheckboxes();
});

$('.cart-choose-all-js').change(function () {
    if ($(this).prop('checked')) {
        $('.cart-checkbox-js').prop('checked', true);
    } else {
        $('.cart-checkbox-js').prop('checked', false);
    }

    checkActiveCheckboxes();
})

function checkActiveCheckboxes() {
    let countCheckedCheckboxes = $('.cart-checkbox-js:checked').length;

    $('#cart-order-count').text(countCheckedCheckboxes);

    if ($('.cart-checkbox-js:not(:checked)').length) {
        $('.cart-choose-all-js').prop('checked', false);
    } else {
        $('.cart-choose-all-js').prop('checked', true);
    }

    if (isDesktop()) {
        if (countCheckedCheckboxes > 0) {
            $('.cart-order-block-js').removeClass('disabled');
        } else {
            $('.cart-order-block-js').addClass('disabled');
        }
    } else {
        if (countCheckedCheckboxes > 0) {
            $('.cart-order-block-js').show();
        } else {
            $('.cart-order-block-js').hide();
        }
    }
}

$('.remove-cart-item-js').click(function () {
    $(this).closest('.cart__item-wrap').remove();
    checkActiveCheckboxes();
})

$('.remove-addition-js').click(function () {
    $(this).closest('.cart__addition').remove();
})

$('.cart-remove-selected-js').click(function () {
    $('.cart__item-wrap:has(.cart-checkbox-js:checked)').remove();
    checkActiveCheckboxes();
})

$('.cart-remove-all-js').click(function () {
    $(this).closest('.cart-block').find('.cart__item-wrap').remove();
})