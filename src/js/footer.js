import $ from "jquery";
import {isDevice, isDesktop} from "./functions.js";

/* footer menu */

if (isDevice()) {
    $('.footer-menu-header-js').click(function () {
        $('.footer-menu-header-js').not($(this)).removeClass('active');
        $('.footer-menu-list-js').not($(this).next()).slideUp(300);

        $(this).toggleClass('active');
        $(this).next().slideToggle(300);
    });
}
/* end footer menu */