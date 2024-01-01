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
    let inputVal = input.val();

    if (inputVal < 2) return;
    input.val(+inputVal - 1);
    $(this).parent().siblings('.buy-js').attr('data-buy-count', input.val());

    // counterBasket = counterBasket - 1;

    displayCounter();
})

amountPlus.click(function () {
    let input = $(this).prev();

    input.val(+input.val() + 1);

    // counterBasket = counterBasket + 1;
    $(this).parent().siblings('.buy-js').attr('data-buy-count', input.val());
    displayCounter();
})

amountInput.on('input', function () {
    if ($(this).val() < 1) $(this).val(1);

    if ($(this).val() > 100) $(this).val(100);

    $(this).parent().siblings('.buy-js').attr('data-buy-count', $(this).val());

    displayCounter();
});

/* end amount */