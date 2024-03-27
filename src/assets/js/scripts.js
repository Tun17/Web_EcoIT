jQuery(function($) {

  "use strict";
  /*
  Smooth Scroll
  */
  $('nav a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      //target = target.length ? target : $('[data-sectionid=' + this.hash.slice(1) +']');
      target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
      else {
        var section = $('[data-sectionid=' + this.hash.slice(1) +']');
        if (section.length) {
          $('html,body').animate({
            scrollTop: section.offset().top - 60
          }, 1500);
          return false;
        }
      }
    }
  });


  /*
Back to Top
*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.scrollTop').fadeIn();
    } else {
      $('.scrollTop').fadeOut();
    }
  });

  $('.scrollTop').click(function (e) {
    e.stopPropagation();
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
  /*try{
    var img = document.getElementById('imgBoxLienHe');
    //or however you get a handle to the IMG
    var height = img.clientHeight;
    $("#boxLienHeCustom").css("height",height);
    $("#imgBoxLienHe").css("height",height);
  }catch(err){}*/
  /*
  Header Sticky
  */
  $(window).on('scroll', function (event) {
    var scrollValue = $(window).scrollTop();
    if (scrollValue > 120) {
      $('#header-wrapper').addClass('affix');
    } else{
      $('#header-wrapper').removeClass('affix');
    }
  });

  $('#sliderNoiBat .carousel-item').each(function() {
    let boxCation = $('#cap'+this.id);
    if($(this).hasClass('active')){
      if(boxCation.css('display') == 'none'){
        boxCation.css('display','block');
      }
    }else{
      boxCation.css('display','none');
    }
  });

  // $('#sliderNoiBat .carousel-item').first().addClass('active');

  $("#sliderNoiBat").on('slid.bs.carousel', function () {
    $('#sliderNoiBat .carousel-item').each(function() {
      var boxCation = $('#cap'+this.id);
      if($(this).hasClass('active')){
        if(boxCation.css('display') == 'none'){
          boxCation.css('display','block');
        }
      }else{
        boxCation.css('display','none');
      }
    });
  });


  /*if ( $('body').hasClass('header-sticky') ) {
    var affixHeader = $('.header-stick');
    var windowSize = $(window).width();
    var headerHeight = $('#header').innerHeight() - affixHeader.innerHeight();
    if ( windowSize > 991 ) {
      if ( $('body').hasClass('header-style-v1') && !$('body').hasClass('header-transparent') ) {
        var smoothHeight = $('.header-stick').outerHeight(true);
        affixHeader.wrap('<div id="header-smooth"></div>').parent().css({height: smoothHeight}); //wrap header for smooth stick and unstick
      }
      $(window).on('load resize scroll', function () {
        $(affixHeader).affix({
          offset: {
            top: headerHeight,
            bottom: 0
          },
        });
      });
    }
  }*/

  /*
  Header Search
  */
  if ( $('.header-search').length ) {
    $('.search-icon' ).on('click', function(e) {
      $(this).parents().find('.search-form').fadeToggle();
      return false;
    });
    $('body').on('click', function(e){
      var $searchform = $('.search-form');
      if (! ($searchform.has(e.target).length || $(e.target).is('.search-form input'))) {
        $searchform.fadeOut('fast','swing');
      }
    });
  }


  // Menu Nav
  // $('ul#primary-menu li, ul#sticky-menu li').on({
  //   mouseenter: function() {
  //     $(this).children('ul').stop(true, true).fadeIn(300);
  //   },
  //   mouseleave: function() {
  //     $(this).children('ul').fadeOut(100);
  //   }
  // });

  // var desktopmenu = $('ul#primary-menu');
  // $('<div id="mobile-container"><ul id="mobile-menu" class="mobile-menu"></ul></div>').insertAfter( $('#toggle-mobile-menu') );
  // $('ul#mobile-menu').html(desktopmenu.children().clone());
  //
  // $('#toggle-mobile-menu').on('click', function(e) {
  //   e.preventDefault();
  //   $('#mobile-menu').slideToggle();
  //   $('#mobile-menu .sub-menu').slideUp();
  // });
  //
  // $('ul#mobile-menu li.menu-item-has-children > a').on('click', function(e) {
  //   e.preventDefault();
  //   $(this).toggleClass('active');
  //   $(this).next().slideToggle();
  //   $(this).parent().siblings().find('a.active').removeClass('active');
  //   $(this).parent().siblings().find('.sub-menu').slideUp();
  // });


  /*
  Parallax Title
  */
  if ( $('.title-parallax #title-wrapper').length ) {
    $('.title-parallax #title-wrapper').each(function() {
      $(this).parallax("50%", 0.4);
    });
  }


  /*
  Parallax Section
  */
  if ( $('.wpb_parallax').length ) {
    $('.wpb_parallax').each(function() {
      var speed = $(this).data('speed')*0.4;
      $(this).parallax("50%", speed);
    });
  }


  /*
Isotope Filter
*/
  $('#load-filter li a').on('click', function (e) {
    $('#load-filter li').removeClass('active');
    $(this).parent().addClass('active');
    var selector = $(this).attr('data-filter');
    var holder = $(this).closest('div').next();
    holder.isotope({
      filter: selector
    });
    return false;
  });

  $('.box-uploadcv input[type=file]').change(function() {
    $('.box-uploadcv input[type=submit]').click();
  });


  // Shortcode Counter
  $('.counter-number').waypoint({
    offset		: '100%',
    triggerOnce	: true,
    handler		: function(){
      let el			= $(this);
      let duration	= Math.floor((Math.random()*1000)+1000);
      let to			= el.attr('id');

      $({property:0}).animate({property:to}, {
        duration	: duration,
        easing		:'linear',
        step		: function() {
          el.text(Math.floor(this.property));
        },
        complete	: function() {
          el.text("+"+this.property);
        }
      });
    }
  });


  /*
  Shortcode Countdown
  */
  $('.countdown').each(function() {
    var launch = $(this).data('date');
    $(this).countdown({until: new Date( launch )});
  });

});

jQuery(document).ready(function($){

  wow = new WOW (
    {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       false,       // default
      live:         true        // default
    }
  )
  wow.init();

});
