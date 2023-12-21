import $ from "jquery";

/* popup выбор языка сайта и города */

// открытие popup
$('.open-popup-js').click(function () {
    let target = $(this).data('target');

    $(target).addClass('active');
    $('body').addClass('overflow-hidden');
});

// Выбор языка, вставка кода языка в шапке сайта
$('#choice-language a').click(function (e) {
    e.preventDefault();

    let currentCode = $(this).data('code');
    let currentLanguage = $('#current-language');

    currentLanguage.text(currentCode);

    $('#choice-language a').removeClass('active');
    $(this).addClass('active');

    // $('.popup').removeClass('active');
});

let inputChoiceCity = $('#choice-city-input');
let currentCity = $('#current-city');

// Выбор города и вставка значения в input и в шапку сайта
$('#choice-city input[type=radio]').click(function () {
    let currentValue = $(this).val();

    inputChoiceCity.val(currentValue);
    currentCity.text(currentValue)
});

// Задание города в текстовом поле, если не пустое, изменяем значение в шапке сайта
inputChoiceCity.on('input', function () {
    let choiceCityValue = $(this).val();

    if (choiceCityValue !== '') {
        currentCity.text(choiceCityValue);
    }
});

// закрытие popup по крестику или темному фону
$('.popup-bg-js, .close-popup-js').click(function () {
    $('.popup').removeClass('active');
    $('body').removeClass('overflow-hidden');

});

/* end popup выбор языка сайта и города */