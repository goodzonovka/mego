import $ from 'jquery';


let editInput = $('.form-input-edit-js');


let inputPassword = $('#password');
let inputRepeatPassword = $('#repeatPassword');


// editInput.click(function () {
//     let input = $(this).siblings('input');
//
//     if (input.attr('disabled')) {
//         input.removeAttr('disabled');
//     } else {
//         input.attr('disabled', 'disabled');
//     }
// })

inputPassword.on('input blur', function () {

    if ($(this).hasClass('error-empty')) return;

    if (!/^.{8,}$/.test($(this).val())) {
        $(this).addClass('error-length-password')
        $(this).removeClass('valid');
        return;
    } else {
        $(this).removeClass('error-length-password')
        $(this).addClass('valid');
    }

    if (inputRepeatPassword.val() !== '') {
        if (inputRepeatPassword.val() !== $(this).val()) {
            inputRepeatPassword.addClass('error-repeat-password')
            inputRepeatPassword.removeClass('valid');
        } else {
            inputRepeatPassword.removeClass('error-repeat-password')
            inputRepeatPassword.addClass('valid');
        }
    }
});

inputRepeatPassword.on('input', function () {
    if ($(this).hasClass('error-empty')) return;
    if (inputPassword.val() !== $(this).val()) {
        $(this).addClass('error-repeat-password')
        $(this).removeClass('valid');
    } else {
        $(this).removeClass('error-repeat-password')
        $(this).addClass('valid');
    }
})

$('.form-valid-passwords-js input').on('input blur', function () {
    let form = $('.form-valid-passwords-js');

    if (form.find('.form-input-required-js.valid').length === 3) {
        form.find('.btn').removeClass('btn-disabled');
    } else {
        form.find('.btn').addClass('btn-disabled');
    }
})