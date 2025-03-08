$(document).ready(function() {
    // Set active nav item based on current page
    const currentPath = window.location.pathname;
    const page = currentPath.split('/').pop() || 'index.html';
    
    // Handle both main pages and tool pages
    $('.navbar-nav .nav-link').each(function() {
        const href = $(this).attr('href');
        if (currentPath.includes('/tools/')) {
            // If we're in a tool page, highlight the Tools nav item
            if (href === 'tools.html' || href === '../tools.html') {
                $('.navbar-nav .nav-link').removeClass('active');
                $(this).addClass('active');
            }
        } else if (href === page) {
            // For main pages, highlight the current page
            $('.navbar-nav .nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Navbar background on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-lg');
        } else {
            $('.navbar').removeClass('shadow-lg');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 75
        }, 800);
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Tool search functionality
    $('#toolSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('.tool-card').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Animate cards on scroll
    function animateOnScroll() {
        $('.card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }

    // Initial animation check
    animateOnScroll();

    // Animation on scroll
    $(window).scroll(function() {
        animateOnScroll();
    });

    // Add hover effect to cards
    $('.card').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );

    // Form validation for contact form
    if ($('#contactForm').length) {
        $('#contactForm').submit(function(e) {
            e.preventDefault();
            
            // Basic form validation
            var isValid = true;
            $('#contactForm .required').each(function() {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to your server
                $('#submitSuccess').fadeIn();
                $('#contactForm')[0].reset();
            }
        });
    }
}); 