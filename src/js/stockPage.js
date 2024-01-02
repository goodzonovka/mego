import $ from 'jquery';
import Swiper from "swiper";
import {Pagination} from "swiper/modules";
import {isMobile} from "./functions.js";


if (isMobile()) {
    new Swiper('.stock-presents-slider', {
        modules: [Pagination],
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 16,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

$('.stock-read-more-js').click(function () {
    $('.stock__hidden-text').slideToggle(300);

    $(this).toggleClass('active');

    let dataShowText = $(this).data('text-show');
    let dataHideText = $(this).data('text-hide');

    if ($(this).hasClass('active')) {
        $(this).text(dataHideText)
    } else {
        $(this).text(dataShowText)
    }
})