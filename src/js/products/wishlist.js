import $ from "jquery";

/* добавление в избранное из preview товара и отображение счетчиков */
let counterWishlist= 0;
let counterWishlistItem = $('.counter-wishlist-js');

$(document).on('click', '.wishlist-js', function () {
    let svgHeartUse = $(this).find('svg use');
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        svgHeartUse.attr('href', './images/icons/icons.svg#heart-fill');
        counterWishlist++;
    } else {
        svgHeartUse.attr('href', './images/icons/icons.svg#heart');
        counterWishlist--;
    }

    if (counterWishlist === 0) {
        counterWishlistItem.text('');
    }
    if (counterWishlist > 0) {
        counterWishlistItem.text(counterWishlist);
    }

});
/* end добавление в избранное из preview товара и отображение счетчиков */