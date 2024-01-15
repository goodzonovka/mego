import $ from 'jquery';
import Swiper from "swiper";
import {Navigation, Pagination, FreeMode, Thumbs} from "swiper/modules";
import Countdown from 'countdown-js';
import {isDesktop, isDevice} from "./functions.js";
import {Fancybox} from "@fancyapps/ui";


document.addEventListener("DOMContentLoaded", function () {
    if ($('.product-page').length) {

        let productTabs = $('.product-tab-js');
        let btnMoreOffers = $('.btn-more-offers-js');

        let btnReviewsMoreAnswers = $('.product-reviews-more-answers-js')
        let btnReviewsMoreReviews = $('.product-reviews-more-reviews-js')

        let responseAuthorScroll = $('.in-response-js');
        let productsTabs = $('.product-tabs-js');
        let btnToBasket = $('.btn-to-basket');
        let amount = $('.product-amount-js');
        let btnBasketLink = $('.btn-basket-link-js');

        let productStickyBuyBlock = $('.product-sticky-buy-block');
        let productStickyBuyBlockInner = $('.product-sticky-buy-block .inner');


        // перенос цены и корзины в фиксированную шапку товара и в блок purchase
        // в зависимости от скролла
        if (isDesktop()) {
            $('.product-purchase__buttons').append(btnToBasket, amount, btnBasketLink);

            let productTabsSlider = $('.product-tabs-slider-js');
            let productTabsOffsetTop = productTabsSlider.offset().top
            let productTabsHeight = productTabsSlider.outerHeight();

            let productPage = $('.product-page');
            let header = $('.header');
            let productHeaderWrap = $('.product-header-wrap');
            let productHeaderWrapHeight = productHeaderWrap.outerHeight();

            $(window).scroll(function () {
                let scrollTop = $(this).scrollTop();

                if (scrollTop + header.outerHeight() > productTabsOffsetTop + productTabsHeight) {
                    productStickyBuyBlockInner.append(btnToBasket, amount, btnBasketLink);
                    $('.product-header__left').after(productStickyBuyBlock);

                    productPage.css('padding-top', productHeaderWrapHeight + 24);
                    productHeaderWrap.addClass('fixed');
                    $('#notification').addClass('product-header-is-fixed');
                } else {
                    $('.product-purchase__buttons').append(btnToBasket, amount, btnBasketLink);

                    productPage.css('padding-top', 0);
                    productHeaderWrap.removeClass('fixed');
                    $('#notification').removeClass('product-header-is-fixed');
                }
            })

            // скролл к верху страницы по клику на картину из фиксированной шапки
            $('.product-header__img').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 0);
            });
        }

        $('.product-variants-tabs__tab').click(function () {
            if ($(this).attr('href')) return;
            let target = $(this).data('target');

            $('.product-variants-tabs__tab, .product-variants__inner').removeClass('active');

            $(this).addClass('active');
            $(target).addClass('active');

        });


        if (isDesktop()) {
            $('.product-variants__variant-color').mouseenter(function (e) {
                e.preventDefault();

                let imageUrl = $(this).data('image');

                if (imageUrl) {
                    $('.product__image-preloader-wrap').addClass('active');

                    let img = new Image();

                    // Устанавливаем обработчик события загрузки изображения
                    img.onload = function () {
                        // Показываем контейнер с изображением
                        $('.product-slider__active-color-img').addClass('active');

                        // Устанавливаем src изображения
                        $('.product-slider__active-color-img img').attr('src', imageUrl);

                        setTimeout(function () {
                            $('.product__image-preloader-wrap').removeClass('active');
                        }, 600);
                    };

                    img.src = imageUrl;

                    if (img.complete) {
                        // Показываем контейнер с изображением
                        $('.product-slider__active-color-img').addClass('active');

                        // Устанавливаем src изображения
                        $('.product-slider__active-color-img img').attr('src', imageUrl);

                        $('.product__image-preloader-wrap').removeClass('active');
                    }
                }

            }).mouseleave(function () {
                $('.product-slider__active-color-img').removeClass('active');
            });
        }

        Fancybox.bind("[data-fancybox]", {
            Images: {
                zoom: false,
            },
        });


        // миниатюры главного слайдера
        let productSliderThumbs = new Swiper('.product-slider-thumbnail-js', {
            modules: [FreeMode, Navigation],
            loop: true,
            slidesPerView: 5,
            spaceBetween: 4,
            direction: 'vertical',
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                prevEl: '.product-slider__thumbnail-arrow--prev',
                nextEl: '.product-slider__thumbnail-arrow--next',
            },
        });

        // главный слайдер
        let productMainSlider = new Swiper('.product-slider-big-images-js', {
            modules: [Thumbs, Pagination],
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            thumbs: {
                swiper: productSliderThumbs,
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
        if (isDevice()) {
            new Swiper('.product-tabs-slider-js', {
                modules: [FreeMode],
                slidesPerView: "auto",
                freeMode: true,
            });
        }

        // клик по табу
        productTabs.mousedown(changeTab);


        function changeTab(e) {
            e.preventDefault();

            let target = $(this).data('target');

            productTabs.removeClass('active');
            $(this).addClass('active');

            // scroll к блокам
            let headerHeight = $('.header').outerHeight();
            let paddingTop = 16;
            let newScrollTopValue;
            if (isDevice()) {
                let productTabsHeight = productsTabs.outerHeight();
                newScrollTopValue = $(target).offset().top - headerHeight - paddingTop - productTabsHeight;
            } else {
                let productHeaderFixed = $('.product-header-wrap').outerHeight();
                newScrollTopValue = $(target).offset().top - headerHeight - productHeaderFixed - paddingTop;
            }

            $('html, body').animate({
                scrollTop: newScrollTopValue
            }, 0);

            if ($(this).attr('data-target-tab')) {
                let targetTab = $(this).data('target-tab');
                $(`[data-target='${targetTab}']`).trigger('click');
            }
        }

        btnMoreOffers.click(function () {
            $('.offers-others-seller').addClass('active');
            $(this).hide();
        });


        new Swiper('.product-buy-together-js', {
            modules: [Pagination, Navigation],
            loop: true,
            slidesPerView: "auto",
            slidesPerGroup: 2,
            spaceBetween: 16,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                prevEl: '.product-buy-together-js .swiper-arrow__prev',
                nextEl: '.product-buy-together-js .swiper-arrow__next',
            },
            breakpoints: {
                1200: {
                    speed: 1000,
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    spaceBetween: 32,
                }
            }
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
            let headerHeight = $('.header').outerHeight();
            let paddingTop = 16;

            $('html, body').animate({
                scrollTop: $(target).offset().top - headerHeight - paddingTop
            }, 0);
        })

        // reviews: tabs
        $('.product-reviews__tabs .tab').click(function () {
            let target = $(this).data('target');
            $('.product-reviews__tabs .tab').removeClass('active');
            $(this).addClass('active')

            $('.product-reviews__list').removeClass('open');
            $(target).addClass('open');

        })


        // фиксированный блок купить, при клике на кнопку купить
        // отобразить amount и ссылку в корзину
        $('.show-amount-and-basket-js').click(function () {
            $('.product-purchase__buttons, .product-sticky-buy-block .inner').addClass('active');
        });


        // sticky для product tabs
        if (isDevice()) {
            let productsTabs = $('.product-tabs-js:has(> .swiper-wrapper)');
            let productsTabsOffsetTop = productsTabs.offset().top;
            $(window).scroll(function () {
                let scrollTop = $(this).scrollTop();

                let wrapper = $('.wrapper');

                if (scrollTop >= productsTabsOffsetTop) {
                    productsTabs.addClass('fixed');
                    wrapper.addClass('product-tabs-fixed');
                } else {
                    productsTabs.removeClass('fixed');
                    wrapper.removeClass('product-tabs-fixed');
                }
            });
        }
    }
});