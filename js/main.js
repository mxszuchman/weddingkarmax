(function () {
  ('use strict');

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $('#wedding-offcanvas, .js-wedding-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-wedding-nav-toggle').removeClass('active');
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $('#page').prepend('<div id="wedding-offcanvas" />');
    $('#page').prepend(
      '<a href="#" class="js-wedding-nav-toggle wedding-nav-toggle wedding-nav-white"><i></i></a>'
    );
    var clone1 = $('.menu-1 > ul').clone();
    $('#wedding-offcanvas').append(clone1);

    $(window).resize(function () {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-wedding-nav-toggle').removeClass('active');
      }
    });
  };

  var burgerMenu = function () {
    $('body').on('click', '.js-wedding-nav-toggle', function (event) {
      var $this = $(this);
      if ($('body').hasClass('overflow offcanvas')) {
        $('body').removeClass('overflow offcanvas');
      } else {
        $('body').addClass('overflow offcanvas');
      }
      $this.toggleClass('active');
      event.preventDefault();
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(
      function (direction) {
        if (
          direction === 'down' &&
          !$(this.element).hasClass('animated-fast')
        ) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .animate-box.item-animate').each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated-fast');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated-fast');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated-fast');
                  } else {
                    el.addClass('fadeInUp animated-fast');
                  }

                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '85%' }
    );
  };

  var goToTop = function () {
    $('.js-gotop').on('click', function (event) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $('html').offset().top,
        },
        500,
        'easeInOutExpo'
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $('.js-top').addClass('active');
      } else {
        $('.js-top').removeClass('active');
      }
    });
  };

  // Loading page
  var loaderPage = function () {
    $('.wedding-loader').fadeOut('slow');
  };

  var counter = function () {
    $('.js-counter').countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($('#wedding-counter').length > 0) {
      $('#wedding-counter').waypoint(
        function (direction) {
          if (direction === 'down' && !$(this.element).hasClass('animated')) {
            setTimeout(counter, 400);
            $(this.element).addClass('animated');
          }
        },
        { offset: '90%' }
      );
    }
  };

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  $(function () {
    //mobileMenuOutsideClick();
    parallax();
    //offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    goToTop();
    loaderPage();
    counter();
    counterWayPoint();
  });
})();

// default example
simplyCountdown('.simply-countdown-one', {
  year: 2023,
  month: 4,
  day: 1,
});

//jQuery example
$('#simply-countdown-losange').simplyCountdown({
  year: 2023,
  month: 4,
  day: 1,
  enableUtc: false,
});

/********************** RSVP **********************/
$('#rsvp-form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();

  $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));
  console.log(data);
  $.post('https://script.google.com/macros/s/AKfycbylBnOQyCF51Xu9cuOV5gAM6WoyV_SteCNGl0d6kRujP_Q0-wO4dum5NLjEVs2aCSuSXg/exec', data)
      .done(function (data) {
          console.log(data);
          if (data.result === "error") {
              $('#alert-wrapper').html(alert_markup('danger', data.message));
          } else {
              $('#alert-wrapper').html('');
              $('#rsvp-modal').modal('show');
          }
      })
      .fail(function (data) {
          console.log(data);
          $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
      });
});

/*
function alert_markup(alert_type, msg) {
  return (
    '<div class="alert alert-' +
    alert_type +
    '" role="alert">' +
    msg +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>'
  );
}
$('#rsvp-form').on('submit', function (e) {
  e.preventDefault();
  $('.wedding-loader').fadeIn('slow');
  var data = $(this).serialize();
  console.log("Data log:");
  console.log(data);
  $.post(
    'https://script.google.com/macros/s/AKfycbylBnOQyCF51Xu9cuOV5gAM6WoyV_SteCNGl0d6kRujP_Q0-wO4dum5NLjEVs2aCSuSXg/exec',  data
  )
    .done(function (data) {
      $('#alert-wrapper').html('');
      $('.wedding-loader').fadeOut('slow');
      $('#rsvp-modal').modal('show');
      $('#rsvp-form').trigger('reset');
    })
    .fail(function (data) {
      $('#alert-wrapper').html(
        alert_markup(
          'danger',
          '<strong>Lo sentimos!</strong> Hubo un problema con el servidor. '
        )
      );
    });
  }
);*/