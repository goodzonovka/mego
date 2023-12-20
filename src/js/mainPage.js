import $ from "jquery";
import Swiper from "swiper";
import {Pagination, EffectFade, Autoplay} from "swiper/modules";

window.addEventListener('load', function () {
    /* main banner */
    new Swiper('.main-banner-js', {
        modules: [EffectFade, Pagination, Autoplay],
        loop: true,
        speed: 1000,
        // autoplay: {
        //     delay: 6000,
        //     disableOnInteraction: false, // Отключить автопрокрутку при взаимодействии пользователя
        // },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    /* end main banner */

    /* products list slider */
    new Swiper('.products-list-slider-js', {
        slidesPerView: "auto",
        spaceBetween: 16,
    });
    /* end products list slider */

    /* banner slider */
    new Swiper('.banner-slider-js', {
        modules: [EffectFade, Pagination, Autoplay],
        loop: true,
        speed: 1000,
        // autoplay: {
        //     delay: 6000,
        //     disableOnInteraction: false, // Отключить автопрокрутку при взаимодействии пользователя
        // },
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

    /* подгрузка товаров */
    let recommendedProducts = $('#recommended-products'); // блок с товарами
    let loadMoreBtn = $('#btn-show-more'); // кнопка загрузить еще
    let products = []; // Хранение всех товаров
    let productsPerPage = 12; // Количество товаров для загрузки
    let currentIndexProduct = 0; // текущий индекс товара для подгрузки

    // Выполнение AJAX-запроса при загрузке страницы
    $.ajax({
        url: "/data/products.json",
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
                                    <use href="./images/icons/icons.svg#star-fill"></use>
                                </svg>
                                <span class="count">5.0</span>
                            </div>

                            <div class="reviews">
                                <svg width="18" height="19">
                                    <use href="./images/icons/icons.svg#message-circle"></use>
                                </svg>
                                <span class="count">345</span>
                            </div>

                        </div>

                        <h3 class="title">
                            <a href="#">${product.name}</a>
                        </h3>

                        <div class="price-block">
                            <div class="price">${product.price}</div>
                        </div>

                        <div class="buttons">
                            <button class="compare compare-js" aria-label="Добавить в сравнение">
                                <svg width="18" height="19">
                                    <use href="./images/icons/icons.svg#compare"></use>
                                </svg>
                            </button>

                            <button class="wishlist wishlist-js" aria-label="Добавить в избранное">
                                <svg width="18" height="19">
                                    <use href="./images/icons/icons.svg#heart"></use>
                                </svg>
                            </button>

                            <button class="buy buy-js" aria-label="Купить">
                                <svg width="18" height="19">
                                    <use href="./images/icons/icons.svg#shopping-cart"></use>
                                </svg>
                            </button>
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