import $ from "jquery";

let counterWishlist= 0;
let counterWishlistItem = $('.counter-wishlist-js');

$(document).on('click', '.wishlist-js', function () {
    let svgHeartUse = $(this).find('svg use');
    $(this).toggleClass('active');

    // изменение иконки и счетчика
    if ($(this).hasClass('active')) {
        svgHeartUse.attr('href', 'images/icons/icons.svg#heart-fill');
        counterWishlist++;
    } else {
        svgHeartUse.attr('href', 'images/icons/icons.svg#heart');
        counterWishlist--;
    }

    // изменение счетчиков
    if (counterWishlist === 0) {
        counterWishlistItem.text('');
    }
    if (counterWishlist > 0) {
        counterWishlistItem.text(counterWishlist);
    }

    // Если карточка товара, то меняем текст
    $(this).hasClass('product-wishlist-js') && productChangeText(this);
});

function productChangeText(btnWishlist) {
    let btn = $(btnWishlist);

    let textAdd = btn.data('text-add');
    let textRemove = btn.data('text-remove');

    if (btn.hasClass('active')) {
        btn.find('.text').text(textRemove)
    } else {
        btn.find('.text').text(textAdd)
    }
}