$(document).ready(function () {
  var body = $('body');

  $.scrollSpeed(80, 2000);

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
    mapBtn: $('.map-btn-wrp'),
    scaleLoad: function () {
      $(this.menuBtn).velocity({scale: 1}, {easing: 'easeIn', delay: 2000});
      $.Velocity.animate($(this.mapBtn), {scale: 1}, {easing: 'easeIn', delay: 2000}).then(function () {
        headerLineAnimation.scroll(headerLineAnimation.headerLine);
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
      var self = this;
      $.Velocity.animate(self.banner, {
        scale: 0.93,
      }, {
        easing: 'linear',
        duration: 300,
      })
    },
    defaultScale: function () {
      var self = this;
      $.Velocity.animate(self.banner, {
        scale: 1,
      }, {
        easing: 'linear',
        duration: 200,
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

});

