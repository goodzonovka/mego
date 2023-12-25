import $ from "jquery";
import 'jquery-ui-dist/jquery-ui.js';
import '@rwap/jquery-ui-touch-punch';

// Price slider

let sliderBlock = $('.filter-slider-js');

sliderBlock.each(function () {
    let slider = $(this).find('.slider');
    let minValueInput = $(this).find(".min-value");
    let maxValueInput = $(this).find(".max-value");
    let minValueInitial = parseInt(minValueInput.val());
    let maxValueInitial = parseInt(maxValueInput.val());

    // Инициализация слайдера
    slider.slider({
        range: true, // Разрешаем выбирать диапазон значений
        min: minValueInitial, // Минимальное значение
        max: maxValueInitial, // Максимальное значение
        values: [minValueInitial, maxValueInitial], // Начальные значения
        slide: function (event, ui) {
            // Обработчик события при изменении значения слайдера
            minValueInput.val(ui.values[0]).trigger('change');
            maxValueInput.val(ui.values[1]).trigger('change');
        }
    });

    let timeoutClear;
    // Обработчики событий изменения значений в input
    minValueInput.on("input change keypress", function () {
        let minValue = parseInt($(this).val());

        clearTimeout(timeoutClear);
        timeoutClear = setTimeout(function () {
            if (minValue < minValueInitial) {
                minValue = minValueInitial;
                minValueInput.val(minValue);
            }
        }, 1000)

        // Обновляем слайдер
        slider.slider("values", 0, minValue);
    });

    maxValueInput.on("input change keypress", function () {
        let maxValue = parseInt($(this).val());

        if (maxValue > maxValueInitial) {
            maxValue = maxValueInitial;
            maxValueInput.val(maxValue);
        }

        // Обновляем слайдер
        slider.slider("values", 1, maxValue);
    });
})