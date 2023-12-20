import $ from "jquery";
import Swiper from "swiper";

/* категории в шапке сайта */
new Swiper('.header-categories-js', {
    slidesPerView: "auto",
    spaceBetween: 16
});
/* end категории в шапке сайта */

/* header: fixed menu */
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let offsetTopForChangeMenu = 150;

    if (scrollTop > offsetTopForChangeMenu) {
        $('#header-top, #header-bottom').slideUp();
    } else {
        $('#header-top, #header-bottom').slideDown();
    }
});
/* end header: fixed menu */