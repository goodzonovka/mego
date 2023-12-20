import $ from "jquery";

/* User menu */
let userMenuBtn = $('.open-user-menu-js');
let userMenu = $('#user-menu');
let userMenuBg = $('#user-menu-bg');
let startX;

// открытие
userMenuBtn.click(function () {
    userMenu.addClass('active');
    $('body').addClass('overflow-hidden');
});

// закрытие
userMenuBg.click(function () {
    userMenu.removeClass('active');
    $('body').removeClass('overflow-hidden');
});

// закрытие по touch событию вправо
userMenu.on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].pageX;
});

userMenu.on('touchmove', function (e) {
    let currentX = e.originalEvent.touches[0].pageX;
    let distance = currentX - startX;

    if (distance > 100) {
        userMenu.removeClass('active');
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