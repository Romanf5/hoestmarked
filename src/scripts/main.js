$(document).ready(function () {
  var body = $('body');

  /*Scroll */
  var $window = $(window);
  var scrollTime = 0.4;
  var scrollDistance = 150;

  $window.on("mousewheel DOMMouseScroll", function(event){

    event.preventDefault();

    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
      ease: Power1.easeOut,
      overwrite: 5
    });

  });
/* /Scroll */

  var headerLineAnimation = {
    headerLine: $('#scroll-line'),
    headerLineText: $('#scroll-line-text'),
    marker: true,
    lineShow: function (element) {
      $.Velocity.animate(element,
        {
          width: "100%",
        }, {
          duration: 700,
          delay: 200,
          easing: [0.05, 0.78, 1, 1],
          progress: function (elements, complete, remaining, start, tweenValue) {
            if (Math.floor(complete * 100) === 64) {
              headerLineAnimation.textShow();
            }
          }
        });
    },
    textShow: function () {
      $(this.headerLineText).velocity("transition.fadeIn",
        {
          duration: 300
        })
    },
    textHidden: function (delay) {
      $(this.headerLineText).velocity({opacity: 0},
        {
          duration: 300,
          progress: function (elements, complete, remaining, start, tweenValue) {
            if (Math.floor(complete * 100) === 100) {
              headerLineAnimation.lineHidden(headerLineAnimation.headerLine, delay);
            }
          }
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
        });
    },
    scroll: function (element) {
      $(window).on('scroll', function () {
        if (!menu.menuBtn.hasClass('icon-close')) {
          if ($(window).scrollTop() > 0) {
            if (headerLineAnimation.marker) {
              headerLineAnimation.lineShow(element);
              headerLineAnimation.marker = false;
            }
          } else if ($(window).scrollTop() === 0) {
            headerLineAnimation.marker = true;
            headerLineAnimation.textHidden();
          }
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
    }
  };

  var menu = {
    menuBtn: $('.menu-btn-wrap'),
    menuWrapper: $('.menu-wrp'),
    leftPart: $('.left-part'),
    rightPart: $('#right-content'),
    menuLogo: $('.menu-logo'),
    menu: $('.menu'),
    openIconClass: 'icon-close',

    slideMenu: function () {
      var self = this;
      $.Velocity.animate(self.menuWrapper, {
        translateX: "0%"
      }, {
        easing: 'linear',
        delay: 300,
        progress: function (elements, complite) {
          if (complite === 1) {
            menu.slideLeftPart();
          }
        }
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
          }

          if (Math.floor(complite * 100) === 70) {
            menu.showMenuLogo();
          }
        }
      }).then(function () {
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
      if ($(this).hasClass('icon-close')) {
        $(this).removeClass('icon-close');
        menu.hiddenMenu();
        body.removeClass('blocked');
      } else {
        $(this).addClass('icon-close').prop('disabled', true);
        body.addClass('blocked');
        heroSection.minScale();
        headerLineAnimation.textHidden(100);
        menu.slideMenu();
      }
    },

    init: function () {
      this.menuBtn.on('click', this.clickBtn);
    }
  };

  heroSection.bannerShow();
  headerBtn.scaleLoad();

  menu.init();

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

   ekologyTimeLine.to("#ecology-img-bord-left, #ecology-img-bord-right", 2, {scaleX:0})
     .to("#ecology-img-bord-top",2,{scaleY:0},0)
     .to("#ecology-text",8,{y:-60});

  var mapText = TweenMax.to("#find-text", 1, {
    opacity: 1,
  });

  var boy = TweenMax.to("#boy", 5,{
    y:-550
  });

  var sliderText = TweenMax.to("#slider-text", 2, {
    opacity: 1,
    y:-50
  });

  var marketImg = TweenMax.to("#market-img",2, {y:0});

  var contactImgOwerlay = new TimelineLite();
  contactImgOwerlay.to("#contact-img-bord-left, #contact-img-bord-right", 4, {scaleX:0})
    .to("#contact-img-bord-top",4,{scaleY:0},0);

  var marketText = TweenMax.to("#market-text", 2, {y:-100});

  var contactText = TweenMax.to("#contact-text",4, {opacity:1});

  var contactImgText = TweenMax.to("#contact-img-text", 5, {y:0});
  var sliderControl = TweenMax.to('#control-slider',1, {scaleX:1});

  var s = new ScrollMagic.Scene({
    triggerElement: "#trigger",
    duration: 900,
    offset: -350
  }).setTween(InfoImg)
    .addIndicators()
    .addTo(controller);

  var s2 = new ScrollMagic.Scene({
    triggerElement: "#trigger",
    duration: 1250,
    offset: -350
  }).setTween(InfoText)
    .addIndicators()
    .addTo(controller);

  var s3 = new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    duration: 1000,
    offset: -15
  }).setTween(timelineImgText)
    .addIndicators({name: 'Find img'})
    .addTo(controller);

  var s4 = new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    duration: 400,
    offset: 300
  }).setTween(mapText)
    .addIndicators({name: "Map Text"})
    .addTo(controller);

  var s5 = new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    duration: 490,
    offset: -200
  }).setTween(timeLineSliderOverlay)
    .addIndicators({name: "Slider"})
    .addTo(controller);

  var s5_1 = new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    duration: 80,
    offset: 500
  }).setTween(sliderControl)
    .addIndicators({name: "Slider Control"})
    .addTo(controller);

  var s6 = new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    duration: 1800,
    offset: 290
  }).setTween(boy)
    .addIndicators({name: "boy"})
    .addTo(controller);

  var s7 = new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    duration: 1200,
    offset: 700
  }).setTween(sliderText)
    .addIndicators({name: "Text"})
    .addTo(controller);

  var s8 = new ScrollMagic.Scene({
    triggerElement: "#trigger4",
    duration: 1200,
    offset: -250
  }).setTween( ekologyTimeLine)
    .addIndicators({name: "Ecology"})
    .addTo(controller);

  var s9 = new ScrollMagic.Scene({
    triggerElement: "#trigger5",
    duration: 1000,
    offset: -270
  }).setTween(marketImg)
    .addIndicators({name:"marketOverlay"})
    .addTo(controller);

  var s11 = new ScrollMagic.Scene({
    triggerElement: "#trigger5",
    duration: 1000,
    offset: 0
  }).setTween(marketText)
    .addIndicators({name:"marketText"})
    .addTo(controller);

  var s12 = new ScrollMagic.Scene({
    triggerElement: "#trigger6",
    duration: 500,
    offset: 0
  }).setTween(contactImgOwerlay)
    .addIndicators({name:"contactO"})
    .addTo(controller);

  var s13 = new ScrollMagic.Scene({
    triggerElement: "#trigger6",
    duration: 500,
    offset: 200
  }).setTween(contactText)
    .addIndicators({name:"contactT"})
    .addTo(controller);

  var s14 = new ScrollMagic.Scene({
    triggerElement: "#trigger6",
    duration: 700,
    offset: 250
  }).setTween(contactImgText)
    .addIndicators({name:"contactIT"})
    .addTo(controller);


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
  cSlide.text(cS+1);

  slick.on('afterChange',function(event, slick, currentSlide){
    cSlide.text(currentSlide+1);
  });



});


