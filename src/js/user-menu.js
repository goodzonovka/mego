import $ from "jquery";
import {isDesktop, isMobile} from "./functions.js";
import {openPopup} from "./choice-language-and-city.js";

/* User menu */
let userMenuBtn = $('.open-user-menu-js');
let userMenu = $('#user-menu');
let userMenuBg = $('#user-menu-bg');
let startX;

if (isDesktop()) {
    $('#header-top').append(userMenu);
}

// открытие
// openPopup('#popup-login');
userMenuBtn.click(function () {
    if (isMobile() || (isDesktop() && $(this).hasClass('is-authorized'))) {
        userMenu.toggleClass('active');
        if (isMobile()) {
            $('body').addClass('overflow-hidden');
        }
    }
});

// закрытие
userMenuBg.click(function () {
    userMenu.removeClass('active');
    if (isMobile()) {
        $('body').removeClass('overflow-hidden');
    }
});

// закрытие вне области меню и кнопки(десктоп)
if (isDesktop()) {
    $(document).mouseup(function (e) {
        if (!userMenu.is(e.target) && userMenu.has(e.target).length === 0 &&
            !userMenuBtn.is(e.target) && userMenuBtn.has(e.target).length === 0
            && userMenu.hasClass('active')
        ) {
            userMenu.removeClass('active');
        }
    });
}

// закрытие по touch событию вправо
userMenu.on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].pageX;
});

userMenu.on('touchmove', function (e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100) {
        $(this).removeClass('active');
        $('body').removeClass('overflow-hidden');
    }
});
// end закрытие по touch событию вправо

// localStorage.setItem('userIsAuthorized', 'true'); - имитация авторизованного юзера,
// чтобы отобразить верстку для авторизованного пользователя в юзер меню и в шапке для отображения
// аватара
// localStorage.removeItem('userIsAuthorized')
if (localStorage.getItem('userIsAuthorized') === 'true') {
    $('body').removeClass('user-is-no-authorized').addClass('user-is-authorized');
}
/* end User menu */