// Initialize EmailJS with your public key
emailjs.init("gzkCoNPzkEtrZ2o91");

// Contact Form Handling
$(document).ready(function() {
    const form = $('#contactForm');
    const submitButton = $('#submitButton');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

    // Custom validation messages
    const validationMessages = {
        name: {
            required: 'Please enter your name',
            minlength: 'Name must be at least 2 characters'
        },
        email: {
            required: 'Please enter your email address',
            email: 'Please enter a valid email address'
        },
        subject: {
            required: 'Please enter a subject',
            minlength: 'Subject must be at least 4 characters'
        },
        message: {
            required: 'Please enter your message',
            minlength: 'Message must be at least 10 characters'
        }
    };

    // Initialize form validation
    form.validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 4
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: validationMessages,
        errorElement: 'span',
        errorClass: 'invalid-feedback',
        highlight: function(element) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });

    // Form submission
    form.on('submit', function(e) {
        e.preventDefault();

        // First validate the form
        if (!form.valid()) {
            return false;
        }

        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            Swal.fire({
                icon: 'warning',
                title: 'Verification Required',
                text: 'Please complete the reCAPTCHA verification.',
                confirmButtonColor: '#3085d6'
            });
            return false;
        }

        // Show loading state
        submitButton.prop('disabled', true)
            .find('.submit-text').addClass('d-none')
            .end()
            .find('.spinner-border').removeClass('d-none');

        // Prepare the template parameters
        const templateParams = {
            from_name: $('#name').val(),
            from_email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
            'g-recaptcha-response': recaptchaResponse
        };

        // Send email using EmailJS
        emailjs.send('service_xjs6s17', 'template_6van008', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Reset form
                form[0].reset();
                form.find('.is-valid').removeClass('is-valid');
                grecaptcha.reset();
                
                // Show success message
                successModal.show();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                
                // Show error message
                errorModal.show();
            })
            .finally(function() {
                // Reset button state
                submitButton.prop('disabled', false)
                    .find('.submit-text').removeClass('d-none')
                    .end()
                    .find('.spinner-border').addClass('d-none');
            });
    });

    // Real-time validation
    form.find('input, textarea').on('input', function() {
        $(this).valid();
    });
}); 