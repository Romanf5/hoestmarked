$(document).ready(function () {
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
    textHidden: function () {
      $(this.headerLineText).velocity({opacity: 0},
        {
          duration: 300,
          progress: function (elements, complete, remaining, start, tweenValue) {
            if (Math.floor(complete * 100) === 100) {
              headerLineAnimation.lineHidden(headerLineAnimation.headerLine);
            }
          }
        })
    },
    lineHidden: function (element) {
      $.Velocity.animate(element,
        {
          width: "0%",
        }, {
          duration: 700,
          easing: [0.05, 0.78, 1, 1]
        });
    },
    scroll: function (element) {
      $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0) {
          if (headerLineAnimation.marker) {
            headerLineAnimation.lineShow(element);
            headerLineAnimation.marker = false;
          }
        } else if ($(window).scrollTop() === 0) {
          headerLineAnimation.marker = true;
          headerLineAnimation.textHidden();
        }
      })
    }
  };

  var headerBtn = {
    menuBtn: $('.menu-btn-wrap'),
    mapBtn: $('.map-btn-wrp'),
    scaleLoad: function () {
      $(this.menuBtn).velocity({scale: 1}, {easing: 'easeIn', delay: 500});
      $.Velocity.animate($(this.mapBtn), {scale: 1}, {easing: 'easeIn', delay: 500}).then(function () {
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
          headerBtn.scaleLoad();
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
    }
  };

  var menu = {
    menuBtn: $('.menu-btn-wrap'),
  };


  heroSection.bannerShow();
});
