$(document).ready(function($) {
  $('#sliderDoiTacKH').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('#sliderTinTuyenDung').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false
  });

  $('#content-post img').each(function (e) {
    var hrefImg = this.src;
    $(this).wrap('<a href="' + hrefImg + '" data-fancybox="images"></a>');
  });

  $('.multiple-items').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3
  });
});
