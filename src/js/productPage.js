import $ from 'jquery';
import Swiper from "swiper";
import {FreeMode, Pagination} from "swiper/modules";
import Countdown from 'countdown-js';

document.addEventListener("DOMContentLoaded", function() {

    let productTabs = $('.product-tab-js');
    let btnMoreOffers = $('.btn-more-offers-js');

    let btnReviewsMoreAnswers = $('.product-reviews-more-answers-js')
    let btnReviewsMoreReviews = $('.product-reviews-more-reviews-js')

    let responseAuthorScroll = $('.in-response-js');

    // главный слайдер
    new Swiper('.product-slider-big-images-js', {
        modules: [Pagination],
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // let time = 1000 * 60 * 60 * 24 * 3
    let time = 1000 * 60 * 60 * 36
    let end = new Date(new Date().getTime() + time)

    let timer = Countdown.timer(end, function (timeLeft) {
        function addZero(item) {
            let array = item.toString().split('');

            if (array.length < 2) array.unshift('0');

            return array;
        }

        let hours = timeLeft.hours;


        if (timeLeft.days !== 0) {
            hours = timeLeft.days * 24 + hours;
        }

        hours = addZero(hours);
        let minutes = addZero(timeLeft.minutes);
        let seconds = addZero(timeLeft.seconds);

        $('#hours span:first-child').text(hours[0]);
        $('#hours span:last-child').text(hours[1]);

        $('#minutes span:first-child').text(minutes[0]);
        $('#minutes span:last-child').text(minutes[1]);

        $('#seconds span:first-child').text(seconds[0]);
        $('#seconds span:last-child').text(seconds[1]);

    }, function () {
        $('#seconds span:last-child').text(0);
        console.log("Countdown Finished!")
    })


    // табы


    // слайдер табов
    new Swiper('.product-tabs-js', {
        modules: [FreeMode],
        slidesPerView: "auto",
        freeMode: true,
    });

    // клик по табу
    productTabs.mousedown(changeTab);


    function changeTab(e) {
        e.preventDefault();

        let target = $(this).data('target');

        productTabs.removeClass('active');
        $(this).addClass('active');
    }

    btnMoreOffers.click(function () {
        $('.offers-others-seller').addClass('active');
        $(this).hide();
    });


    new Swiper('.product-buy-together-js', {
        modules: [Pagination],
        loop: true,
        slidesPerView: "auto",
        slidesPerGroup: 2,
        spaceBetween: 16,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // reviews: больше отзывов
    btnReviewsMoreAnswers.click(function () {
        $(this).closest('.product-reviews__item').addClass('active');
        $(this).hide();
    })

    btnReviewsMoreReviews.click(function () {
        $('.product-reviews__list').addClass('active');
        $(this).hide();
    })

    responseAuthorScroll.click(function () {
        let target = $(this).data('target');

        console.log($('.header').outerHeight())
        $('html, body').animate({
            scrollTop: $(target).offset().top - $('.header').outerHeight() - 16
        }, 0);
    })

    // reviews: tabs
    $('.product-reviews__tabs .tab').click(function () {
        let target = $(this).data('target');
        $('.product-reviews__tabs .tab').removeClass('active');
        $(this).addClass('active')

        $('.product-reviews__list-wrap').removeClass('open');
        $(target).addClass('open');

    })


    // фиксированный блок купить, при клике на кнопку купить
    // отобразить amount и ссылку в корзину

});