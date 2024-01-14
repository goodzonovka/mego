import $ from 'jquery';
import {isDesktop} from "./functions.js";
import {openPopup} from "./choice-language-and-city.js";

if (isDesktop()) {
    $('.cart__sidebar').append($('.cart-order-block'));
    $('.cart__present').each(function () {
        $(this).find('.status-list, .title').wrapAll('<div class="status-list-title-wrap">');
    })
}

if ($('.cart-page').length) {
    openPopup('#product-changes');

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
                $('.cart-remove-selected-js').show();
                $('.cart-order-block-js').removeClass('disabled');
                $('.order-selected-js').removeClass('btn-disabled');
            } else {
                $('.cart-remove-selected-js').hide();
                $('.cart-order-block-js').addClass('disabled');
                $('.order-selected-js').addClass('btn-disabled');
            }
        } else {
            $('.order-selected-js').removeClass('btn-disabled');
            if (countCheckedCheckboxes > 0) {
                $('.cart-order-block-js, .cart-remove-selected-js').show();
                $('.cart-page-wrap').addClass('cart-is-active');
            } else {
                $('.cart-order-block-js, .cart-remove-selected-js').hide();
                $('.cart-page-wrap').removeClass('cart-is-active');
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
}