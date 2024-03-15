import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/js/intlTelInput';

window.addEventListener('load', () => {
    const phoneInputs = document.querySelectorAll('[data-input_phone]');

    if (phoneInputs) {
        for (const input of phoneInputs) {
            intlTelInput(input, {
                initialCountry: "MD",
                separateDialCode: true,
            });
        }
    }
})
