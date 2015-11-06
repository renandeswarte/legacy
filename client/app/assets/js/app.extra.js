$(function() {

  // catch scroll to minify the logo
  $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      if (scroll !== 0) {
        $('.header-navbar').addClass('scrolled');
      } else {
        $('.header-navbar').removeClass('scrolled');
      }
  });

})