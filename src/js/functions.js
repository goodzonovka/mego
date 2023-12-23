import $ from "jquery";

let ww = $(window).width();

export let isDevice = () => ww < 1200;
export let isDesktop = () => ww > 1199;

export let isMobile = () => ww < 768;