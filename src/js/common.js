import $ from "jquery";
import MatchHeight from 'matchheight';
import {isDevice} from "./functions.js";

new MatchHeight('.product-item .price-block');

/* tooltip */
$('.tooltip-btn-js').click(function (e) {
    if (isDevice()) {
        e.preventDefault();
    }
    $('.tooltip-btn-js').not(this).removeClass('active');
    $(this).toggleClass('active');
})

// закрытие tooltip вне клика на него
$(document).mouseup(function (e) {
    let tooltipDropdown = $('.tooltip-dropdown-js'),
        tooltipBtn = $('.tooltip-btn-js');

    if ( !tooltipDropdown.is(e.target) && tooltipDropdown.has(e.target).length === 0 &&
        !tooltipBtn.is(e.target) && tooltipBtn.has(e.target).length === 0
    ) {
        tooltipBtn.removeClass('active');
    }
});
/* end tooltip */

/* описание на странице - скрыть/показать */
let description = $('.description-js');
let btnReadMore = description.next('.btn-read-more-js');

description.each(function () {
    if ($(this).height() > description.find('.user-content').height()) {
        $(this).next('.btn-read-more-js').addClass('active');
    }
});

btnReadMore.click(function () {
    let btnReadMore = $(this);
    let dataShowText = btnReadMore.data('text-show');
    let dataHideText = btnReadMore.data('text-hide');

    if (!btnReadMore.hasClass('active')) {
        btnReadMore.text(dataHideText)
    } else {
        btnReadMore.text(dataShowText)
    }
    btnReadMore.toggleClass('active');
    btnReadMore.prev('.description-js').toggleClass('active');
});
/* end описание на странице - скрыть/показать */

/* кнопка вверх */
let buttonToTop = $('#button-to-top');
$(window).scroll(function() {

    if ($(this).scrollTop() > 600) {
        buttonToTop.addClass('active');
    } else {
        buttonToTop.removeClass('active');
    }
});

buttonToTop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 0);
    return false;
});
/* end кнопка вверх */