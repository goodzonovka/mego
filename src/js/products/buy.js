import $ from "jquery";
import {isMobile} from "../functions.js";

/* Добавление товара в корзину, уведомление + отображение счетчиков */
let notification = $('#notification');
let timerNotification = null;

let counterBasketItem = $('.counter-basket-js');

let buttonToTop = $('#button-to-top');

$(document).on('click', '.buy-js', function () {
    if (isMobile) {
        buttonToTop.addClass('notification-is-active');
    }
    notification.fadeIn(300);

    if (timerNotification !== null) clearTimeout(timerNotification);

    timerNotification = setTimeout(function () {
        notification.fadeOut(300);
        if (isMobile) {
            buttonToTop.removeClass('notification-is-active');
        }
    }, 3000);

    let currentBuyCount = $(this).attr('data-buy-count');
    currentBuyCount++;

    $(this).attr('data-buy-count', currentBuyCount)


    displayCounter();
});

function displayCounter() {
    let totalBuyCount = 0;
    $('[data-buy-count]').each(function () {
        totalBuyCount += +$(this).attr('data-buy-count');
    });

    if (totalBuyCount === 0) {
        counterBasketItem.text('');
    }
    if (totalBuyCount > 0) {
        counterBasketItem.text(totalBuyCount);
    }
}

// закрытие уведомление по клику на крестик
let btnCloseNotification = $('#notification-close');

btnCloseNotification.click(function () {
    clearTimeout(timerNotification);
    notification.fadeOut(300);
    buttonToTop.removeClass('notification-is-active');
});
/* end Добавление товара в корзину, уведомление + отображение счетчиков */

/* amount */
let amountMinus = $('.amount-minus-js');
let amountInput = $('.amount-input-js');
let amountPlus = $('.amount-plus-js');

amountMinus.click(function () {
    let input = $(this).next();
    let dataAddCount = 1;

    if ($(this).closest('.amount').data('add-count')) {
        dataAddCount = $(this).closest('.amount').data('add-count');
    }


    input.val(+input.val() - dataAddCount);
    if (input.val() < 1) {
        input.val(1);
        $(this).parent().siblings('.buy-js').attr('data-buy-count', 1);
        return;
    }
    $(this).parent().siblings('.buy-js').attr('data-buy-count', input.val());

    displayCounter();
})

amountPlus.click(function () {
    let input = $(this).prev();
    let dataAddCount = 1;
    let dataMax = $(this).closest('.amount').data('max');

    if ($(this).closest('.amount').data('add-count')) {
        dataAddCount = $(this).closest('.amount').data('add-count');
    }

    input.val(+input.val() + dataAddCount);
    $(this).parent().siblings('.buy-js').attr('data-buy-count', input.val());
    if (input.val() > dataMax) {
        input.val(dataMax);
        $(this).parent().siblings('.buy-js').attr('data-buy-count', dataMax);
        return
    }

    displayCounter();
})

amountInput.on('input', function () {
    if ($(this).val() < 1) $(this).val(1);

    if ($(this).val() > 100) $(this).val(100);

    $(this).parent().siblings('.buy-js').attr('data-buy-count', $(this).val());

    displayCounter();
});

/* end amount */