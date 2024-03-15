import $ from 'jquery';

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/js/intlTelInput';
import {checkValidForm} from "./common.js";
import {openPopup} from "./choice-language-and-city.js";
import {isDesktop, isMobile} from "./functions.js";

window.addEventListener('load', () => {
    if ($('.phone-countries-js').length) {

        let input = document.querySelectorAll(".phone-countries-js");

        input.forEach(function (item) {
            intlTelInput(item, {
                initialCountry: "MD",
                separateDialCode: true,
            });
        })

        if (isDesktop() && $('#input-change-phone').length) {
            let inputChangePhone = document.querySelector("#input-change-phone");

            inputChangePhone.addEventListener("open:countrydropdown", function () {
                // do something with iti.getSelectedCountryData()
                $('#popup-change-phone').addClass('active-dropdown');
            });
            inputChangePhone.addEventListener("close:countrydropdown", function () {
                // do something with iti.getSelectedCountryData()
                $('#popup-change-phone').removeClass('active-dropdown');
            });
        }

        let dataPhones = ['111111111', '222222222', '333333333']

        function findPhone(value) {
            return dataPhones.indexOf(value) !== -1 && true;
        }

        let initialSeconds = 29;
        let startSeconds = initialSeconds;
        let timerOff = true;
        let intervalId;

        let btnEnterText = $('.login__btn').data('text-enter');
        let btnConfirmText = $('.login__btn').data('text-confirm');

        $('.open-user-menu-js').click(function () {
            if (!isMobile() && !(isDesktop() && $(this).hasClass('is-authorized'))) {
                resetForm($('.login__form'));
                openPopup('#popup-login');
            }
        })

        $('.login__change-phone').click(function (e) {
            e.preventDefault();
            let form = $(this).closest('.form-valid-js');

            resetForm(form);
        })

        $('.login__request-new-code').click(function (e) {
            e.preventDefault();
            let form = $(this).closest('.form-valid-js');

            $(this).hide();

            resetTimer(form);
            showTimer(form);
        })

        function resetTimer(form) {
            form.find('.login__code-timer').removeClass('stop-animate');
            clearInterval(intervalId);
            startSeconds = initialSeconds;
            timerOff = true;
        }

        function resetForm(form) {
            form.find('.login__request-new-code').hide();
            form.find('input').attr('disabled', 'disabled').removeClass('valid');
            form.find('input').val('');
            form.find('.phone-countries-js').removeAttr('disabled');
            form.find('.form-input-change-email').removeAttr('disabled');
            form.removeClass('state-code');
            form.find('.btn').text(btnEnterText);
            resetTimer(form);
        }

        function showTimer(form) {
            let timerValue = form.find('.timer-value');
            timerValue.text('00:' + (startSeconds + 1));
            intervalId = setInterval(function () {
                if (startSeconds < 0) {
                    clearInterval(intervalId);
                    form.find('.login__request-new-code').show();
                    $('.login__code-timer').addClass('stop-animate');
                    // resetForm(form);
                    return;
                }

                if (startSeconds < 10) {
                    timerValue.text('00:0' + startSeconds);
                } else {
                    timerValue.text('00:' + startSeconds);
                }
                startSeconds--;
            }, 1000);

            timerOff = false;
        }

        $('.phone-countries-js').on('blur', function () {
            let inputVal = $(this).val();
            let form = $(this).closest('.form-valid-js');
            let btn = form.find('.login__btn');

            let passwordWrap = form.find('.login__password')
            let inputPassword = passwordWrap.find('input');

            let inputCode = form.find('.form-input__code');

            if ($(this).hasClass('error-empty') || $(this).hasClass('error-phone')) return;

            if (findPhone(inputVal) && !$(this).closest('.popup-change-phone').length) {
                inputPassword.removeAttr('disabled')
                passwordWrap.slideDown(300);
            } else {
                passwordWrap.slideUp(300);
                inputPassword.attr('disabled', 'disabled');

                // открывам поле с кодом
                btn.text(btnConfirmText);
                inputCode.removeAttr('disabled')
                form.addClass('state-code');

                if (timerOff) showTimer(form);
            }
            $(this).attr('disabled', 'disabled');
        })

        $('.form-input-change-email').on('blur', function () {
            let form = $(this).closest('.form-valid-js');
            let inputCode = form.find('.form-input__code');
            let btn = form.find('.login__btn');

            if ($(this).hasClass('error-empty') || $(this).hasClass('error-email')) return;

            btn.text(btnConfirmText);
            inputCode.removeAttr('disabled')
            form.addClass('state-code');

            if (timerOff) showTimer(form);
            $(this).attr('disabled', 'disabled');
        });

        $('.login__btn').click(function (e) {
            e.preventDefault();

            let form = $(this).closest('.form-valid-js');

            if (checkValidForm(this)) {
                if ($(this).closest('.popup-change-phone').length) {

                    $('.close-popup-js').trigger('click');

                    setTimeout(function () {
                        openPopup('#popup-information-saved');
                        resetForm(form);
                    }, 600);

                } else {
                    form.submit();
                }
            }
        });

        $('.popup-login .popup-bg-js, .popup-login .close-popup-js').click(function () {
            resetForm($('.popup-login .form-valid-js'));
        });
    }
});
