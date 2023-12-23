import $ from "jquery";
import {isDevice, isDesktop} from "./functions.js";

/* footer menu */

if (isDevice()) {
    $('.footer-menu-header-js').click(function () {
        if (!$(this).hasClass('active')) {
            $('.footer-menu-header-js').removeClass('active');
            $('.footer-menu-list-js').slideUp(300);

            $(this).addClass('active');
            $(this).next().slideToggle(300);
        }
    });
}
/* end footer menu */