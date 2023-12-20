import $ from "jquery";

/* tooltip */
$('.tooltip-btn-js').click(function () {
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
let description = $('#description');
let descriptionInner = description.find('.user-content');
let btnReadMore = $('#btn-read-more');

if (description.height() > descriptionInner.height()) {
    btnReadMore.hide();
    description.addClass('active');
}

btnReadMore.click(function () {
    let dataShowText = btnReadMore.data('text-show');
    let dataHideText = btnReadMore.data('text-hide');

    if (!btnReadMore.hasClass('active')) {
        btnReadMore.text(dataHideText)
    } else {
        btnReadMore.text(dataShowText)
    }
    btnReadMore.toggleClass('active');
    description.toggleClass('active');
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