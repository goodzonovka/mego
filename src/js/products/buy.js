import $ from "jquery";

/* Добавление товара в корзину, уведомление + отображение счетчиков */
let notification = $('#notification');
let timerNotification = null;

let counterBasket = 0;
let counterBasketItem = $('.counter-basket-js');

let buttonToTop = $('#button-to-top');

$(document).on('click', '.buy-js', function () {
    buttonToTop.addClass('notification-is-active');
    notification.fadeIn(300);

    if (timerNotification !== null) clearTimeout(timerNotification);

    timerNotification = setTimeout(function () {
        notification.fadeOut(300);
        buttonToTop.removeClass('notification-is-active');
    }, 3000);

    counterBasket++;

    if (counterBasket === 0) {
        counterBasketItem.text('');
    }
    if (counterBasket > 0) {
        counterBasketItem.text(counterBasket);
    }
});

// закрытие уведомление по клику на крестик
let btnCloseNotification = $('#notification-close');

btnCloseNotification.click(function () {
    clearTimeout(timerNotification);
    notification.fadeOut(300);
    buttonToTop.removeClass('notification-is-active');
});
/* end Добавление товара в корзину, уведомление + отображение счетчиков */