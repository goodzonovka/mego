import $ from 'jquery';
import {isDesktop} from "./functions.js";

$(function () {
    if ($('.contact-page').length) {
        if (isDesktop()) {
            $('.contact-top__inner').append($('#map'));
        }

        let map = $('#map');

        let lt = map.data('latitude');
        let lg = map.data('longitude');
        let address = map.data('address');

        let itemMap = L.map('map').setView([lt, lg], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(itemMap);

        // Добавление кастомизированного маркера
        let customIcon = L.icon({
            iconUrl: 'images/contact/marker.png',
            iconSize: [44, 44], // Размер иконки
            iconAnchor: [16, 32], // Анкер иконки
            popupAnchor: [15, -32] // Анкер всплывающей подсказки
        });

        L.marker([lt, lg], {icon: customIcon}).addTo(itemMap)
            .bindPopup(address)
    }
});