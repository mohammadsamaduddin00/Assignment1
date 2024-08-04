document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.has-mega-menu');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const megaMenu = item.querySelector('.mega-menu');
            const isVisible = megaMenu.style.display === 'block';
            
            document.querySelectorAll('.mega-menu').forEach(menu => {
                menu.style.display = 'none';
            });

            if (!isVisible) {
                megaMenu.style.display = 'block';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-mega-menu')) {
            document.querySelectorAll('.mega-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-button');
    const prevButtons = document.querySelectorAll('.prev-button');
    const form = document.getElementById('wizard-form');
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
        updateReviewSummary();
    }

    function validateStep() {
        const currentFormStep = steps[currentStep];
        const inputs = currentFormStep.querySelectorAll('input[required]');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ccc';
            }
        });
        return valid;
    }

    function updateReviewSummary() {
        if (currentStep === 2) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                                    .map(checkbox => checkbox.value)
                                    .join(', ');

            const summary = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phone}</p>
                <p><strong>Product Categories:</strong> ${categories}</p>
            `;
            document.getElementById('review-summary').innerHTML = summary;
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep()) {
                if (currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                }
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep()) {
            alert('Form submitted successfully!');
        }
    });

    showStep(0);
});
