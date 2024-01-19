import $ from "jquery";
import Swiper from "swiper";
import {Navigation, Pagination, EffectFade, Autoplay} from "swiper/modules";
import {isDevice, isDesktop} from "./functions.js";
import {openPopup} from "./choice-language-and-city.js";

window.addEventListener('load', function () {
    /* main banner */
    new Swiper('.main-banner-js', {
        modules: [Navigation, EffectFade, Pagination, Autoplay],
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 6000,
            pauseOnMouseEnter: true,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: '.swiper-arrow__prev',
            nextEl: '.swiper-arrow__next',
        },
    });
    /* end main banner */

    /* products list slider */
    new Swiper('.products-list-slider-js', {
        modules: [Pagination, Navigation, Autoplay],
        loop: true,
        slidesPerView: "auto",
        slidesPerGroup: 2,
        spaceBetween: 16,
        autoplay: {
            delay: 4000,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: '.swiper-arrow__prev',
            nextEl: '.swiper-arrow__next',
        },
        breakpoints: {
            568: {
                slidesPerGroup: 3,
            },
            768: {
                slidesPerGroup: 4,
            },
            // 992: {
            //     slidesPerGroup: 5,
            // },
            1200: {
                speed: 1000,
                slidesPerView: 6,
                slidesPerGroup: 6,
                spaceBetween: 0,
            }
        },
        on: {
            init: function () {
                if (window.innerWidth < 1200) {
                    this.autoplay.stop();
                } else {
                    this.autoplay.start();
                }
            },
        },
    });
    /* end products list slider */
    if (isDevice()) {

        /* banner slider */
        new Swiper('.banner-slider-js', {
            modules: [EffectFade, Pagination, Autoplay],
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false, // Отключить автопрокрутку при взаимодействии пользователя
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
        /* end banner slider */
    }

    /* подгрузка товаров */
    let recommendedProducts = $('#recommended-products'); // блок с товарами
    let loadMoreBtn = $('#btn-show-more'); // кнопка загрузить еще
    let products = []; // Хранение всех товаров
    let productsPerPage = 12; // Количество товаров для загрузки
    let currentIndexProduct = 0; // текущий индекс товара для подгрузки

    // Выполнение AJAX-запроса при загрузке страницы
    $.ajax({
        url: "data/products.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            products = data;
        },
        error: function(xhr, status, error) {
            console.error("Ошибка загрузки данных: " + error);
        }
    });


    loadMoreBtn.on('click', function () {
        // выбираем товары с массива products
        let productsToLoad = products.slice(currentIndexProduct, currentIndexProduct + productsPerPage);
        currentIndexProduct = currentIndexProduct + productsPerPage;

        // загружаем товары в блок с товарами
        $.each(productsToLoad, function(index, product) {
            let productItem = $(`
                    <div class="product-item">
                        <a href="#" class="img">
                            <img src=${product.imageUrl} width="163" height="163" alt="">
                        </a>

                        <div class="additional-information">

                            <div class="rating">
                                <svg width="18" height="19">
                                    <use href="images/icons/icons.svg#star-fill"></use>
                                </svg>
                                <span class="count">5.0</span>
                            </div>

                            <div class="reviews">
                                <svg width="18" height="19">
                                    <use href="images/icons/icons.svg#message-circle"></use>
                                </svg>
                                <span class="count">345</span>
                            </div>

                        </div>

                        <h3 class="title">
                            <a href="#">${product.name}</a>
                        </h3>

                        <div class="bottom">
                            <div class="price-block">
                                <div class="price">${product.price}</div>
                            </div>
    
                            <div class="buttons">
                                <button class="compare compare-js" aria-label="Добавить в сравнение">
                                    <svg width="18" height="19">
                                        <use href="images/icons/icons.svg#compare"></use>
                                    </svg>
                                </button>
    
                                <button class="wishlist wishlist-js" aria-label="Добавить в избранное">
                                    <svg width="18" height="19">
                                        <use href="images/icons/icons.svg#heart"></use>
                                    </svg>
                                </button>
    
                                <button class="buy buy-js" aria-label="Купить" data-buy-count="0">
                                    <svg width="18" height="19">
                                        <use href="images/icons/icons.svg#shopping-cart"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `);

            recommendedProducts.append(productItem)
        });

        // скрываем кнопку
        if (currentIndexProduct >= products.length) {
            loadMoreBtn.hide();
        }
    });
    /* end подгрузка товаров */
});