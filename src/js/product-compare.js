import Swiper from "swiper";
import { Navigation, Scrollbar, FreeMode } from 'swiper/modules';
import MatchHeight from "matchheight";
import {isDesktop, isDevice} from "./functions.js";

const pc = document.querySelector('[data-pc]');

if (pc) {
    const eqTopContainer = () => new MatchHeight('[data-top_container]');
    const eqCompareCells = () => new MatchHeight('[data-compare_cell]');
    const isDifferenciesOnly = document.querySelector('[data-show_only_differencies]');

    const highlightRow = (event) => {
        let rowId = event.target.dataset.compare_cell;
        let rowCells = document.querySelectorAll(`[data-compare_cell="${rowId}"]`);

        if (event.type == 'mouseover') {
            for (const cell of rowCells) {
                cell.parentElement.classList.add('active');
            }
        } else if (event.type == 'mouseout') {
            for (const cell of rowCells) {
                cell.parentElement.classList.remove('active');
            }
        }
    }

    const updateCells = () => {
        let cells = document.querySelectorAll('[data-compare_cell]');

        if (cells) {
            for (const cell of cells) {
                cell.addEventListener('mouseover', (evt) => highlightRow(evt));
                cell.addEventListener('mouseout', (evt) => highlightRow(evt));
            }
        }
    }

    const carousel = new Swiper('[data-product_carousel]', {
        modules: [Navigation, Scrollbar, FreeMode],
        init: false,
        slidesPerView: 1,
        grabCursor: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        freeMode: true,
        navigation: {
            nextEl: '[data-product_carousel_next]',
            prevEl: '[data-product_carousel_prev]',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });

    carousel.on('afterInit update', function () {
        eqTopContainer();
        eqCompareCells();
        updateCells();
        console.log('carousel updated');
    });

    carousel.init();

    const showOnlyDifferencies = (isChecked) => {
        const compareCells = document.querySelectorAll('[data-compare_cell]');
        if (compareCells) {
            if (isChecked) {
                let rows = [];

                for (const cell of compareCells) {
                    // Get rows list
                    const rowId = cell.dataset.compare_cell;
                    if (!rows.includes(rowId)) {
                        rows.push(rowId);
                    }
                }

                for (const row of rows) {
                    // for every cell in a row
                    const cells = document.querySelectorAll(`[data-compare_cell="${row}"]`);
                    const [firstCell, ...comparedCells] = cells; // exclude first cell from a compare list, because it's just a label
                    const firstCellContent = comparedCells[0].textContent.toLowerCase();
                    let isDifferent = false;

                    for (const cell of comparedCells) {
                        // for every cell compare text with first cell in a row
                        // return true if text is different
                        let cellContent = cell.textContent.toLowerCase();
                        if ( cellContent !== firstCellContent ) {
                            isDifferent = true;
                        }
                    }

                    if (!isDifferent) {
                        // if there are different text in a row, add hidden class
                        for (const cell of cells) {
                            cell.parentNode.classList.add('hidden');
                        }
                    }
                }

            } else {
                for (const cell of compareCells) {
                    // remove hidden class if unchecked
                    cell.parentNode.classList.remove('hidden');
                }
            }
        }
    }

    isDifferenciesOnly.addEventListener('change', (evt) => showOnlyDifferencies(evt.target.checked))

    const updateCarousel = () => carousel.update(); // call this if you need to update the carousel
}
