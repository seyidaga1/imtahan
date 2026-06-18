(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
        return false;
    });


    $('a[href^="#"]').on('click', function (e) {
        var href = $(this).attr('href');
        if (href === '#') return;
        var target = $(href);
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 800, 'easeInOutExpo');
        }
    });


    function revealOnScroll() {
        var scrollTop  = $(window).scrollTop();
        var winHeight  = $(window).height();
        $('.reveal').each(function () {
            if ($(this).offset().top < scrollTop + winHeight - 60) {
                $(this).addClass('revealed');
            }
        });
    }

    $(document).ready(function () {
        $('.fruite-item, .vesitable-item, .featurs-item, .service-item, .counter, .testimonial-item').each(function () {
            $(this).addClass('reveal');
        });
        revealOnScroll();
    });
    $(window).on('scroll', revealOnScroll);


    function animateCounters() {
        $('.counter h1[data-count]').each(function () {
            var $this = $(this);
            if ($this.hasClass('counted')) return;
            var target = parseInt($this.data('count'));
            $this.addClass('counted');
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: 'easeOutQuad',
                step: function () {
                    $this.text(Math.floor(this.count).toLocaleString());
                },
                complete: function () {
                    $this.text(target.toLocaleString());
                }
            });
        });
    }

    // data-count atributunu counter h1-lərdən avtomatik götür
    $(document).ready(function () {
        $('.counter h1').each(function () {
            var txt = $(this).text().replace(/[^0-9]/g, '');
            if (txt) {
                $(this).attr('data-count', txt).text('0');
            }
        });
    });

    $(window).on('scroll', function () {
        $('.counter').each(function () {
            var elemTop = $(this).offset().top;
            if (elemTop < $(window).scrollTop() + $(window).height() - 50) {
                animateCounters();
            }
        });
    });


    var heroTitle = $('.hero-header h1');
    if (heroTitle.length) {
        var originalText = heroTitle.text();
        heroTitle.text('');
        var charIndex = 0;
        setTimeout(function typeChar() {
            if (charIndex < originalText.length) {
                heroTitle.text(heroTitle.text() + originalText[charIndex]);
                charIndex++;
                setTimeout(typeChar, 45);
            }
        }, 800);
    }


    $(document).on('mousemove', '.fruite-item, .vesitable-item', function (e) {
        var $card  = $(this);
        var offset = $card.offset();
        var cx     = offset.left + $card.width()  / 2;
        var cy     = offset.top  + $card.height() / 2;
        var dx     = (e.pageX - cx) / ($card.width()  / 2);
        var dy     = (e.pageY - cy) / ($card.height() / 2);
        $card.css('transform', 'perspective(600px) rotateY(' + (dx * 6) + 'deg) rotateX(' + (-dy * 6) + 'deg) translateY(-8px)');
    });
    $(document).on('mouseleave', '.fruite-item, .vesitable-item', function () {
        $(this).css('transform', '');
    });


    $(document).ready(function () {
        setTimeout(function () {
            $('.skeleton').removeClass('skeleton');
        }, 500);
    });


    $(document).ready(function () {
        $('.navbar-nav .nav-link').each(function () {
            $(this).wrapInner('<span class="nav-text"></span>');
        });
    });


    $(document).on('click', 'a:contains("Səbətə")', function (e) {
        var $btn = $(this);
        $btn.addClass('cart-bounce');
        setTimeout(function () { $btn.removeClass('cart-bounce'); }, 600);

        // Float "+" particle
        var $plus = $('<span class="cart-plus">+1</span>').css({
            position: 'absolute',
            top: $btn.position().top - 10,
            left: $btn.position().left + $btn.width() / 2,
            color: '#2e7d32',
            fontWeight: 'bold',
            fontSize: '16px',
            pointerEvents: 'none',
            zIndex: 9999
        });
        $btn.closest('.position-relative, .p-4').css('position', 'relative').append($plus);
        $plus.animate({ top: '-=40', opacity: 0 }, 700, function () { $(this).remove(); });
    });


    $(document).on('click', '.btn', function (e) {
        var $btn   = $(this);
        var offset = $btn.offset();
        var x      = e.pageX - offset.left;
        var y      = e.pageY - offset.top;
        var $rip   = $('<span class="btn-ripple"></span>').css({ left: x, top: y });
        $btn.append($rip);
        setTimeout(function () { $rip.remove(); }, 600);
    });


    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsiveClass: true,
        responsive: {
            0:    { items: 1 },
            576:  { items: 1 },
            768:  { items: 1 },
            992:  { items: 2 },
            1200: { items: 2 }
        }
    });


    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsiveClass: true,
        responsive: {
            0:    { items: 1 },
            576:  { items: 1 },
            768:  { items: 2 },
            992:  { items: 3 },
            1200: { items: 4 }
        }
    });


    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () { $videoSrc = $(this).data("src"); });
        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });
        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });
    });


    $('.quantity button').on('click', function () {
        var button   = $(this);
        var input    = button.parent().parent().find('input');
        var oldValue = parseFloat(input.val());
        var newVal   = button.hasClass('btn-plus') ? oldValue + 1 : Math.max(0, oldValue - 1);
        input.val(newVal);
    });

})(jQuery);
