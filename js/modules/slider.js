const { module } = require("../../webpack.config");

// Slider

function slider(sliderW) {
  $(document).ready(function () {
    $(sliderW).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
}

export default slider;
