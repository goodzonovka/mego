import $ from 'jquery';

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/js/intlTelInput';
import {checkValidForm} from "./common.js";

document.addEventListener('DOMContentLoaded', () => {
    if ($('.login-page').length) {
        const input = document.querySelector("#phone");

        intlTelInput(input, {
            initialCountry: "MD",
            separateDialCode: true,
        });

        $('.btn-login').click(function (e) {
            e.preventDefault();

            let form = $(this).closest('.form-valid-js');

            if (checkValidForm(this)) {
                form.submit();
            }
        });
    }
});