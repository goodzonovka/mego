import $ from 'jquery';

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/js/intlTelInput';
import {checkValidForm} from "./common.js";

document.addEventListener('DOMContentLoaded', () => {
    if ($('.phone-countries-js').length) {

        let input = document.querySelectorAll(".phone-countries-js");

        input.forEach(function (item) {
            intlTelInput(item, {
                initialCountry: "MD",
                separateDialCode: true,
            });
        })

        $('.login .login__btn').click(function (e) {
            e.preventDefault();

            let form = $(this).closest('.form-valid-js');

            if (checkValidForm(this)) {
                form.submit();
            }
        });
    }
});