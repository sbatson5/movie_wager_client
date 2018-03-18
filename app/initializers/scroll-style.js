import $ from 'jquery';

export function initialize() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.nav-bar').addClass('box-shadow');
    } else {
      $('.nav-bar').removeClass('box-shadow');
    }
  });
}

export default {
  name: 'scroll-style',
  initialize
};
