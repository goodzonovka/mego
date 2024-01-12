import $ from 'jquery';

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/js/intlTelInput';
import {checkValidForm} from "./common.js";

window.addEventListener('load', () => {
    if ($('.phone-countries-js').length) {

        let input = document.querySelectorAll(".phone-countries-js");

        input.forEach(function (item) {
            intlTelInput(item, {
                initialCountry: "MD",
                separateDialCode: true,
            });
        })

        let dataPhones = ['111111111', '222222222', '333333333']

        function findPhone(value) {
           return dataPhones.indexOf(value) !== -1 && true;
        }

        let initialSeconds = 29
        let startSeconds = initialSeconds;
        let timerOff = true;
        let intervalId;

        let btnEnterText = $('.login__btn').data('text-enter');
        let btnConfirmText = $('.login__btn').data('text-confirm');

        function newCode() {
            clearInterval(intervalId);
            showTimer();
        }

        $('.login__change-phone').click(function (e) {
            e.preventDefault();
            let form = $(this).closest('.form-valid-js');

            resetForm(form);
        })

        $('.login__request-new-code').click(function (e) {
            e.preventDefault();
            let form = $(this).closest('.form-valid-js');

            resetTimer();
            showTimer(form);
        })

        function resetTimer() {
            clearInterval(intervalId);
            startSeconds = initialSeconds;
            timerOff = true;
        }

        function resetForm(form) {
            form.find('input').attr('disabled', 'disabled');
            form.find('.phone-countries-js').removeAttr('disabled').val('');
            form.removeClass('state-code');
            form.find('.btn').text(btnEnterText);
            resetTimer();
        }

        function showTimer(form) {
            let timerValue = form.find('.timer-value');
            timerValue.text('00:' + (startSeconds + 1));
            intervalId = setInterval(function () {
                if (startSeconds < 0) {
                    clearInterval(intervalId);
                    resetForm(form);
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

            if (findPhone(inputVal)) {
                inputPassword.removeAttr('disabled')
                passwordWrap.slideDown(300);
            } else {
                if ($(this).hasClass('error-empty')) return;
                passwordWrap.slideUp(300);
                inputPassword.attr('disabled', 'disabled');

                // открывам поле с кодом
                btn.text(btnConfirmText);
                inputCode.removeAttr('disabled')
                form.addClass('state-code');

                if(timerOff) showTimer(form);
            }
            $(this).attr('disabled', 'disabled');

        })

        $('.login__btn').click(function (e) {
            e.preventDefault();

            let form = $(this).closest('.form-valid-js');

            if (checkValidForm(this)) {
                form.submit();
            }
        });
    }
});