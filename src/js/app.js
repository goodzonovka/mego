import "./header.js";
import "./footer.js";
import "./user-menu.js";
import "./choice-language-and-city.js";
import "./common.js";
import "./search.js";

import "./mainPage.js";
import "./catalog.js";
import "./sub-catalog.js";

import "./products/buy.js";
import "./products/wishlist.js";
import "./products/comparison.js";

/* проверка на поддержку webp формата */
import BaseHelpers from './helpers/BaseHelpers.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();
/* end проверка на поддержку webp формата */