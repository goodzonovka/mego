import $ from "jquery";
import MatchHeight from 'matchheight';
import {isDesktop, isDevice} from "./functions.js";

new MatchHeight('.product-item .price-block');

/* pagination */

if (isDesktop()) {
    $('#pagination').prepend($('#pagination .select-link-js'));
}
$('.pagination-prev-js, .pagination-next-js').click(function (e) {
    e.preventDefault();
})
/* end pagination */

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
    if ($(this).height() < $(this).find('.user-content').height()) {
        $(this).next('.btn-read-more-js').addClass('show');
    } else {
        $(this).addClass('visible');
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

/* select */
let selectButton = $('.select-button-js');
let selectDropdown = $('.select-dropdown-js');
let selectLink = $('.select-link-js');

selectButton.click(openSelectDropdown);

selectLink.click(setActiveLink);

$(document).mouseup(closingSelectDropdownOutside);

function openSelectDropdown() {
    $(this).next().fadeToggle(300);
}

function setActiveLink(e) {
    e.preventDefault();

    let currentText = $(this).text();
    let selectCurrent = $(this).closest('.select').find('.select-current-js');
    let selectDropdown = $(this).closest('.select-dropdown-js');


    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    selectCurrent.text(currentText);

    selectDropdown.fadeOut(300);
}

function closingSelectDropdownOutside(e) {
    if ( !selectDropdown.is(e.target) && selectDropdown.has(e.target).length === 0 &&
        !selectButton.is(e.target) && selectButton.has(e.target).length === 0
    ) {
        selectDropdown.fadeOut(300);
    }
}
/* end select */


/* required inputs */
let inputRequired = $('.form-input-required-js');

let inputPhone = $('.form-input-phone-js');
let additionalPhone = $('.form-input-additional-phone-js');
let inputEmail = $('.form-input-email-js');
let phonePattern = /^(\+)?[\d\s\(\)\-]+$/;
let additionalPhonePattern = /^(\+)?[\d\s\(\)\-]*$/;
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

inputRequired.on('input blur', function () {
    let inputVal = $(this).val();

    if (inputVal === '') {
        $(this).addClass('error-empty');
        $(this).removeClass('valid error-phone error-email error-repeat-password error-length-password');
    } else {
        $(this).removeClass('error-empty');
        $(this).addClass('valid');
    }
})

inputEmail.blur(function () {
    let email = $(this).val();
    if ($(this).hasClass('error-empty')) return;

    if (emailPattern.test(email)) {
        $(this).removeClass('error-email')
    } else {
        $(this).addClass('error-email');
    }

});

inputPhone.blur(function () {
    let phone = $(this).val();
    if ($(this).hasClass('error-empty')) return;

    if (phonePattern.test(phone)) {
        $(this).removeClass('error-phone')
    } else {
        $(this).addClass('error-phone');
    }
});

additionalPhone.blur(function () {
    let phone = $(this).val();

    if (additionalPhonePattern.test(phone)) {
        $(this).removeClass('error-phone')
    } else {
        $(this).addClass('error-phone');
    }
});

export function checkValidForm(btn) {
    let form = $(btn).closest('.form-valid-js');

    form.find('.form-input-required-js:not([disabled])').each(function () {
        if ($(this).val() === '') $(this).addClass('error-empty');
    })

    if (form.find('.form-input-required-js:not([disabled]):not(.valid)').length) {
        if (!form.hasClass('no-scroll-to-error')) {
            form.find('.form-input-required-js:not([disabled]):not(.valid)').each(function () {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 100
                }, 0);
                return false;
            });
        }

        return false;
    }

    return true;
}

$('.form-valid-submit').click(function (e) {
    e.preventDefault();
    let form = $(this).closest('.form-valid-js');

    if (checkValidForm(this)) form.submit();
})
/* end required inputs */