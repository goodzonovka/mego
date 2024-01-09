import $ from 'jquery';
import {openPopup} from "./choice-language-and-city.js";
import {checkValidForm} from "./common.js";

let btnChangeUser = $('.order-change-user-js');
let changeUserForm = $('.order-change-user-form-js');
let btnCancelChangeUser = $('.btn-cancel-change-user-js');
let btnSaveChangeUser = $('.btn-order-change-user-save-js');
let btnOrderConfirmed = $('.order-confirmed-js');

let paymentRadio = $('input[name=payment]');

btnChangeUser.click(function () {
    changeUserForm.addClass('active').removeClass('saving');
    changeUserForm.find('input').removeAttr('disabled')
});

btnCancelChangeUser.click(function () {
    changeUserForm.find('input, textarea').removeClass('error-phone error-email error-empty');
    changeUserForm.find('input, textarea').val('');
    changeUserForm.removeClass('not-saving');
    changeUserForm.removeClass('active');
    changeUserForm.find('input').attr('disabled', 'disabled');
})

btnSaveChangeUser.click(function () {
    if (checkValidForm(this)) {
        let name = changeUserForm.find('input[name=name]').val();
        let surname = changeUserForm.find('input[name=surname]').val();
        let phone = changeUserForm.find('input[name=phone]').val();

        $('.order-name-js').text(name + ' ' + surname);
        $('.order-phone-js').text(phone);

        changeUserForm.removeClass('active not-saving').addClass('saving');
    }
});

changeUserForm.find('input, textarea').on('input', function () {
    $(this).closest('.order-change-user-form-js').addClass('not-saving');
})

btnOrderConfirmed.click(function (e) {
    e.preventDefault();
    if ($('.order-change-user-form-js.not-saving').length) {
        openPopup('#recipient-notification');
    }

    let form = $(this).closest('.form-valid-js');

    if (checkValidForm(this)) form.submit();
});


paymentRadio.change(function () {
    let target = $(this).data('target');

    $('.order-block-payment__content').removeClass('active');
    $('.order-block-payment__content input').attr('disabled', 'disabled');
    if (target) {
        $(target).addClass('active');

        $(target).find('input').removeAttr('disabled');
    }
})