$(document).ready(function () {
  var body = $('body');
  var width = $(window).outerWidth();
  var headerLineAnimation = {
    headerLine: $('#scroll-line'),
    headerLineText: $('#scroll-line-text'),
    marker: true,
    marker2: false,
    lineShow: function (element) {
      $.Velocity.animate(element,
        {
          width: "100%",
        }, {
          duration: 700,
          delay: 200,
          easing: [0.05, 0.78, 1, 1],
        }).then(function () {
        headerLineAnimation.headerLineText.css('display', 'inline-block');
        headerLineAnimation.textShow();
      });
    },
    textShow: function () {
      $.Velocity.animate(this.headerLineText, "transition.fadeIn",
        {
          duration: 300
        }).then(function () {
        headerLineAnimation.marker2 = true;
      })
    },
    textHidden: function (delay) {
      $.Velocity.animate(this.headerLineText, {opacity: 0},
        {
          duration: 300,
        }).then(function () {
        headerLineAnimation.headerLineText.css('display', 'none');
        headerLineAnimation.lineHidden(headerLineAnimation.headerLine, delay);
      })
    },
    lineHidden: function (element, delay) {
      var delayTime = delay;

      if (!delayTime) {
        delayTime = 700
      }
      $.Velocity.animate(element,
        {
          width: "0%",
        }, {
          duration: delayTime,
          easing: [0.05, 0.78, 1, 1]
        }).then(function () {
        headerLineAnimation.marker = true;
      })
    },
    scroll: function (element) {
      $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0 && headerLineAnimation.marker) {
          headerLineAnimation.lineShow(element);
          headerLineAnimation.marker = false;
        } else if ($(window).scrollTop() === 0 && !headerLineAnimation.marker && headerLineAnimation.marker2) {
          headerLineAnimation.textHidden();

        }
      })
    }
  };
  var headerBtn = {
    menuBtn: $('.menu-btn-wrap'),
    menui: $('.icon-menu'),
    mapi: $('.icon-map-icon'),
    mapBtn: $('.map-btn-wrp'),
    showIcon: function () {
      $(this.menui).velocity({opacity: 1}, {easing: 'easeIn', delay: 300});
      $(this.mapi).velocity({opacity: 1}, {easing: 'easeIn', delay: 300});
    },
    scaleLoad: function () {
      $(this.menuBtn).velocity({scale: 1}, {easing: 'easeIn', delay: 2000});
      $.Velocity.animate($(this.mapBtn), {scale: 1}, {easing: 'easeIn', delay: 2000}).then(function () {
        headerLineAnimation.scroll(headerLineAnimation.headerLine);
        headerBtn.showIcon();
      })
    }
  };
  var heroSection = {
    logo: $('.logo'),
    banner: $('.js-animation-banner'),
    downArrow: $('.btn-scroll-down'),
    body: $('body'),
    bannerShow: function () {
      var self = this;
      $.Velocity.animate(this.banner,
        {
          opacity: 1
        }, {
          easing: 'linear',
          delay: 600,
          duration: 800,
          progress: function (start) {
            if (start) {
              self.body.addClass('blocked');
            }
          }
        }).then(function (elements) {
        if (elements) {
          heroSection.showLogo();
          heroSection.showArrow();
        }
      });
    },
    showLogo: function () {
      var self = this;
      $.Velocity.animate(this.logo, {
        opacity: 1,
      }, {
        easing: 'easeIn',
        delay: 500
      }).then(function () {
        self.body.removeClass('blocked')
      })
    },
    showArrow: function () {
      var self = this;
      this.downArrow.velocity({
        opacity: 1,
      }, {
        easing: 'easeIn',
        delay: 500
      })
    },
    minScale: function () {

      $.Velocity.animate($('#hero-img-bord-left'), {
        scale: 7,
      }, {
        easing: 'linear',
        duration: 300,
      });

      $.Velocity.animate($('#hero-img-bord-right'), {
        scale: 7,
      }, {
        easing: 'linear',
        duration: 300,
      });

      $.Velocity.animate($('#hero-img-bord-top'), {
        scale: 7,
      }, {
        easing: 'linear',
        duration: 300,
      });

      $.Velocity.animate($('#hero-img-bord-bot'), {
        scale: 7,
      }, {
        easing: 'linear',
        duration: 300,
      });
    },
    defaultScale: function () {

      $.Velocity.animate($('#hero-img-bord-left'), {
        scale: 0,
      }, {
        easing: 'linear',
        duration: 300,
        delay: 500
      });

      $.Velocity.animate($('#hero-img-bord-right'), {
        scale: 0,
      }, {
        easing: 'linear',
        duration: 300,
        delay: 500
      });

      $.Velocity.animate($('#hero-img-bord-bot'), {
        scale: 0,
      }, {
        easing: 'linear',
        duration: 300,
        delay: 500
      });

      $.Velocity.animate($('#hero-img-bord-top'), {
        scale: 0,
      }, {
        easing: 'linear',
        duration: 300,
        delay: 500
      });
    },
  };
  var menu = {
    menuBtn: $('.menu-btn-wrap'),
    menuWrapper: $('.menu-wrp'),
    leftPart: $('.left-part'),
    rightPart: $('#right-content'),
    menuLogo: $('.menu-logo'),
    menu: $('.menu'),
    openIconClass: 'icon-close',
    signUpBtn: $('#sign-up'),
    signUpForm: $('.sign-up-form'),
    hiddenText: $('#text-hidden'),

    signUpFormShow: function () {
      if ($(this).hasClass('show')) {
        $(this).removeClass('show');
        menu.signUpForm.slideUp();
      } else {
        $(this).addClass('show');
        menu.signUpForm.slideDown();
      }
    },

    slideMenu: function () {
      var self = this;
      $.Velocity.animate(self.menuWrapper, {
        translateX: "0%"
      }, {
        easing: 'linear',
        delay: 300,
      }).then(function () {
        menu.slideLeftPart();
      })
    },

    slideLeftPart: function () {
      var self = this;
      $.Velocity.animate(self.leftPart, {
        translateX: '0%',
      }, {
        easing: 'linear',
        delay: 300,
        progress: function (elements, complite, start) {
          if (start) {
            menu.menuBtn.addClass('trans-bg');

            if (width < 1024) {
              $('.map-btn-wrp').addClass('trans-bg');
            }
          }
        }
      }).then(function () {
        menu.showMenuLogo();
        menu.showLeftContent();
        menu.showRightContent();
      })
    },

    showMenuLogo: function () {
      $.Velocity.animate(this.menuLogo, {
        opacity: 1,
      }, {
        easing: 'linear',
        delay: 200,
        duration: 400,
      });
    },

    showLeftContent: function () {
      $.Velocity.animate(this.menu, {
        opacity: 1,
      }, {
        easing: 'linear',
        duration: 450,
        delay: 250
      })
    },

    showRightContent: function () {
      $.Velocity.animate(this.rightPart, {
        opacity: 1,
      }, {
        easing: 'linear',
        duration: 500,
        delay: 250
      }).then(function () {
        menu.menuBtn.prop('disabled', false);
      })
    },

    hiddenMenuLogo: function () {
      this.menuBtn.prop('disabled', true);
      $.Velocity.animate(this.menuLogo, {
        opacity: 0,
      }, {
        easing: 'linear',
        delay: 150,
        duration: 150,
      }).then(function () {
        menu.hiddenLeftContent();
        menu.hiddenRightContent();
      });
    },

    hiddenLeftContent: function () {
      $.Velocity.animate(this.menu, {
        opacity: 0,
      }, {
        easing: 'linear',
        duration: 250,
        delay: 200
      })
    },

    hiddenRightContent: function () {
      $.Velocity.animate(this.rightPart, {
        opacity: 0,
      }, {
        easing: 'linear',
        duration: 300,
        delay: 250
      }).then(function () {
        menu.hiddenLeftPart();
      })
    },

    hiddenLeftPart: function () {
      $.Velocity.animate(this.leftPart, {
        translateX: '-300%',
      }, {
        easing: 'linear',
        duration: 150,
      }).then(function () {
        menu.menuBtn.removeClass('trans-bg');
        if (width < 1024) {
          $('.map-btn-wrp').removeClass('trans-bg');
        }
        menu.hiddenOveraly();
      })
    },

    hiddenOveraly: function () {
      var self = this;
      if ($(window).scrollTop() !== 0) {
        headerLineAnimation.lineShow(headerLineAnimation.headerLine);
      }
      $.Velocity.animate(self.menuWrapper, {
        translateX: "100%"
      }, {
        easing: 'linear',
        delay: 200,
      }).then(function () {
        heroSection.defaultScale();
        menu.menuBtn.prop('disabled', false);
      })
    },

    hiddenMenu: function () {
      this.hiddenMenuLogo();
    },

    clickBtn: function () {
      if ($(this).hasClass('icon-closes')) {
        $(this).removeClass('icon-closes');
        menu.hiddenMenu();
        body.removeClass('blocked');
        menu.signUpBtn.removeClass('show');
        menu.hiddenText.slideDown();
        menu.signUpForm.slideUp();
      } else {
        $(this).addClass('icon-closes').prop('disabled', true);
        body.addClass('blocked');
        heroSection.minScale();
        headerLineAnimation.textHidden(100);
        menu.slideMenu();
      }
    },

    init: function () {
      this.menuBtn.on('click', this.clickBtn);
      this.signUpBtn.on('click', this.signUpFormShow)
    }
  };


  var heightHeader = $('.page-header').height();
  heroSection.downArrow.click(function () {
    $('html, body').animate({
      scrollTop: $("#section-info").offset().top - heightHeader
    }, 2000);
  });

  /*Scroll */
  var $window = $(window);
  var scrollTime = 0.4;
  var scrollDistance = 150;

  if (width > 1024) {
    $('body').on("mousewheel DOMMouseScroll", function (event) {

      if (!menu.menuBtn.hasClass('icon-closes')) {

        event.preventDefault();

        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
          scrollTo: {y: finalScroll, autoKill: true},
          ease: Power1.easeOut,
          overwrite: 5
        });

      }

    });
    /* /Scroll */
  }
  /* /Scroll*/

  /*Animation Home page*/
  if (width >= 1024 && $('body').hasClass('home-page')) {
    /*Animation*/
    var controller = new ScrollMagic.Controller();

    var InfoImg = TweenMax.to("#info-img-translate, #info-img-bord-left, #info-img-bord-top", 2, {
      scale: 1,
      y: 0
    });
    var InfoText = TweenMax.to("#info-text", 3, {
      y: 0,
    });

    var timelineImgText = new TimelineLite();

    timelineImgText.to("#find-img-bord-left, #find-img-bord-right", 2, {
      scaleX: 0,
    })
      .to("#find-img-bord-top", 2, {
        scaleY: 0,
      }, 0)
      .to("#img-desc", 4, {
        y: 0,
      }, 0.5);

    var timeLineSliderOverlay = new TimelineLite();

    timeLineSliderOverlay.to("#slider-img-bord-left, #slider-img-bord-right", 2, {
      scaleX: 0,
    })
      .to("#slider-img-bord-top", 2, {
        scaleY: 0,
      }, 0);

    var ekologyTimeLine = new TimelineLite();

    ekologyTimeLine.to("#ecology-img-bord-left, #ecology-img-bord-right", 2, {scaleX: 0})
      .to("#ecology-img-bord-top", 2, {scaleY: 0}, 0)
      .to("#ecology-text", 8, {y: -60});

    var mapText = TweenMax.to("#find-text", 1, {
      opacity: 1,
    });

    var boy = TweenMax.to("#boy", 5, {
      y: -550
    });

    var sliderText = TweenMax.to("#slider-text", 2, {
      opacity: 1,
      y: -50
    });

    var marketImg = TweenMax.to("#market-img", 2, {y: 0});

    var contactImgOwerlay = new TimelineLite();
    contactImgOwerlay.to("#contact-img-bord-left, #contact-img-bord-right", 4, {scaleX: 0})
      .to("#contact-img-bord-top", 4, {scaleY: 0}, 0);

    var marketText = TweenMax.to("#market-text", 2, {y: -100});

    var contactText = TweenMax.to("#contact-text", 4, {opacity: 1});

    var contactImgText = TweenMax.to("#contact-img-text", 5, {y: 0});
    var sliderControl = TweenMax.to('#control-slider', 1, {scaleX: 1});

    var durationInfoImg;

    if (width > 1200) {
      durationInfoImg = 900;
    } else {
      durationInfoImg = 600;
    }

    var s = new ScrollMagic.Scene({
      triggerElement: "#trigger",
      duration: durationInfoImg,
      offset: -350
    }).setTween(InfoImg)
    /*.addIndicators()*/
      .addTo(controller);

    var s2 = new ScrollMagic.Scene({
      triggerElement: "#trigger",
      duration: 1250,
      offset: -350
    }).setTween(InfoText)
    /* .addIndicators()*/
      .addTo(controller);

    var s3 = new ScrollMagic.Scene({
      triggerElement: "#trigger2",
      duration: 1000,
      offset: -15
    }).setTween(timelineImgText)
    /* .addIndicators({name: 'Find img'})*/
      .addTo(controller);

    var s4 = new ScrollMagic.Scene({
      triggerElement: "#trigger2",
      duration: 400,
      offset: 300
    }).setTween(mapText)
    /*.addIndicators({name: "Map Text"})*/
      .addTo(controller);

    var s5 = new ScrollMagic.Scene({
      triggerElement: "#trigger3",
      duration: 490,
      offset: -200
    }).setTween(timeLineSliderOverlay)
    /*.addIndicators({name: "Slider"})*/
      .addTo(controller);


    var offsetControlSlider;
    if (width > 1440) {
      offsetControlSlider = 500;
    } else {
      offsetControlSlider = 300;
    }

    var s5_1 = new ScrollMagic.Scene({
      triggerElement: "#trigger3",
      duration: 80,
      offset: offsetControlSlider
    }).setTween(sliderControl)
    /* .addIndicators({name: "Slider Control"})*/
      .addTo(controller);

    var s6 = new ScrollMagic.Scene({
      triggerElement: "#trigger3",
      duration: 1800,
      offset: 290
    }).setTween(boy)
    /* .addIndicators({name: "boy"})*/
      .addTo(controller);


    var offsetTextSlider;
    if (width > 1200) {
      offsetTextSlider = 700;
    } else {
      offsetTextSlider = 300;
    }

    var s7 = new ScrollMagic.Scene({
      triggerElement: "#trigger3",
      duration: 1200,
      offset: offsetTextSlider
    }).setTween(sliderText)
    /*.addIndicators({name: "Text"})*/
      .addTo(controller);

    var s8 = new ScrollMagic.Scene({
      triggerElement: "#trigger4",
      duration: 1200,
      offset: -250
    }).setTween(ekologyTimeLine)
    /*.addIndicators({name: "Ecology"})*/
      .addTo(controller);

    var s9 = new ScrollMagic.Scene({
      triggerElement: "#trigger5",
      duration: 1000,
      offset: -270
    }).setTween(marketImg)
    /*.addIndicators({name: "marketOverlay"})*/
      .addTo(controller);

    var s11 = new ScrollMagic.Scene({
      triggerElement: "#trigger5",
      duration: 1000,
      offset: 0
    }).setTween(marketText)
    /*.addIndicators({name: "marketText"})*/
      .addTo(controller);

    var s12 = new ScrollMagic.Scene({
      triggerElement: "#trigger6",
      duration: 500,
      offset: 0
    }).setTween(contactImgOwerlay)
    /*.addIndicators({name: "contactO"})*/
      .addTo(controller);

    var s13 = new ScrollMagic.Scene({
      triggerElement: "#trigger6",
      duration: 500,
      offset: 200
    }).setTween(contactText)
    /*.addIndicators({name: "contactT"})*/
      .addTo(controller);

    var s14 = new ScrollMagic.Scene({
      triggerElement: "#trigger6",
      duration: 700,
      offset: 250
    }).setTween(contactImgText)
    /*.addIndicators({name: "contactIT"})*/
      .addTo(controller);
  }
  /* /Animation Home page*/

  /*Slider Home page*/
  if ($('body').hasClass('home-page')) {

    /*Slider*/
    var slick = $("#slider").slick({
      appendArrows: $('.slider-control'),
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
    });

    var cSlide = $('#cSlide');
    var aSlides = $('#aSlides');
    var cS = slick.slick('slickCurrentSlide');
    var gSlick = slick.slick('getSlick');

    aSlides.text(gSlick.$slides.length);
    cSlide.text(cS + 1);

    slick.on('afterChange', function (event, slick, currentSlide) {
      cSlide.text(currentSlide + 1);
    });
  }
  /*Slider Home page*/

  var markerTime = true;

  $("#bgvid").on("timeupdate", function () {
    var timeVideo = Math.round(this.duration * 1000);
    var cTime = Math.floor(this.currentTime);
    if (cTime === 0 && markerTime) {
      markerTime = false;
      bar(timeVideo);
    }

  });

  function bar(duration) {
    var bar = new ProgressBar.Circle(time_line, {
      strokeWidth: 50,
      easing: 'linear',
      duration: duration,
      color: '#FFF',
      svgStyle: null
    });

    bar.animate(1, function () {
      bar.destroy();
      markerTime = true;
    });
  }

  /*Main Init*/
  heroSection.bannerShow();
  headerBtn.scaleLoad();
  menu.init();
  /*Main Init*/
});




