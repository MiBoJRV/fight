document.addEventListener("DOMContentLoaded", () => {

    const radioInputs = document.querySelectorAll(".select-box__input");

    radioInputs.forEach(input => {
        input.addEventListener("change", () => {
            radioInputs.forEach(otherInput => otherInput.removeAttribute("checked"));
            input.setAttribute("checked", "checked");
        });
    });


    const stepper = document.querySelector('.stepper');
    const dotsContainer = document.getElementById('dotsContainer');
    const dots = dotsContainer.querySelectorAll('.dot');
    const stepText = document.getElementById('stepText');
    const selectedValues = {};

    let currentStep = 1;

    const updateStepText = () => {
        const totalSteps = 3;
        const displayedStep = currentStep - 1;

        stepText.textContent = `Step ${displayedStep} of ${totalSteps}`;
    };

    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 2 === currentStep);
        });
    };

    const showHideDots = () => {
        dotsContainer.style.display = currentStep === 1 || currentStep === 5 ? 'none' : 'flex';
    };

    const navigateToSlide = (slide) => {
        const slides = document.querySelectorAll('.step');

        if (slides[slide - 1]) {
            if (currentStep === 4 && slide === 5) {
                console.log("Saved data:", JSON.stringify(selectedValues));
            }

            slides.forEach((s) => {
                s.classList.remove('active');
            });

            slides[slide - 1].classList.add('active');

            currentStep = slide;
            updateStepText();
            updateDots();
            showHideDots();
        }
    };

    const saveSelectedValue = function () {
        const h2Text = this.closest('.step').querySelector('h2').textContent;
        const liText = this.textContent;
        selectedValues[h2Text] = liText;


        // Додайте клас 'active' до обраного li
        this.classList.add('active');

        // Видаліть клас 'active' у сусідніх li
        const siblings = Array.from(this.parentNode.children);
        siblings.forEach((sibling) => {
            if (sibling !== this) {
                sibling.classList.remove('active');
            }
        });
    };

    stepper.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'A' && target.id === 'startButton') {
            navigateToSlide(2);
        } else if (target.tagName === 'LI' && currentStep !== 5) {
            saveSelectedValue.call(target);
            navigateToSlide(currentStep + 1);
        }
    });

    dotsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
            const slide = Array.from(dots).indexOf(target) + 2;
            navigateToSlide(slide);
        }
    });

    updateStepText();
    updateDots();
    showHideDots();




    const form = document.querySelector('form.dr-form');

    function getFormElements(form) {
        const firstNameField = form.querySelector('.form__input.first-name');
        const lastNameField = form.querySelector('.form__input.last-name');
        const emailField = form.querySelector('.form__input.email');
        const phoneField = form.querySelector('.form__input.phone');
        // const areaCodeField = form.querySelector('.form__input.area_code');
        const areaCodeField = form.querySelector('.phone-input .select-box__input:checked');

        return {
            firstNameField,
            lastNameField,
            emailField,
            phoneField,
            areaCodeField
        };
    }

    function sendLeadData(event, form, formElements, selectedValues) {
        event.preventDefault();
        const firstName = formElements.firstNameField.value;
        const lastName = formElements.lastNameField.value;
        const email = formElements.emailField.value;
        const phone = formElements.phoneField.value;
        // const areaCodeField = formElements.areaCodeField.value;
        // const countryCode = '420';

        const checkedRadio = document.querySelector('.select-box__input:checked');
        const areaCodeField = checkedRadio ? checkedRadio.value : '';

        const fullNumber = `${areaCodeField}${phone}`;

        const data = {
            ApiKey: 'TnpRek1sODFNVEJmTnpRek1sOD0=',
            ApiPassword: 'c8UAV7s6G8',
            CampaignID: '11230',
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: fullNumber,
            Page: 'fight',
            Description: JSON.stringify(Object.values(selectedValues)),
        };


        const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

        function encodeFormData(data) {
            return Object.keys(data)
                .map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                })
                .join('&')
        }

        fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeFormData(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Lead data sent successfully!');

                    return response.json();
                } else {
                    throw new Error('Failed to send lead data');
                }
            })
            .then(responseJson => {
                if (responseJson.ret_code !== '404') {
                    // window.location.href = 'thank-you.html';
                    // const redirectUrl = responseJson.url;
                    // window.location.href = redirectUrl;

                    // localStorage.setItem('responseJson', JSON.stringify(responseJson));
                    // window.location.href = 'thank-you.html';

                    const redirectUrl = responseJson.url;
                    window.location.href = redirectUrl;

                    // new Promise(resolve => setTimeout(resolve, 1000))
                    //     .then(() => {
                    //         const redirectUrl = responseJson.url;
                    //         window.location.href = redirectUrl;
                    //     });
                } else {
                    console.log('Problem with redirect.');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error.message);
            });
    }

    const formElements = getFormElements(form);

    const submitBtn = document.querySelector('.main-form-btn');
    submitBtn.addEventListener('click', (event) => {
        console.log('click');
        event.preventDefault();

        let isValid;
        ////////////////////////////
        const validForm = () => {
            const firstName = formElements.firstNameField.value;
            const lastName = formElements.lastNameField.value;
            const email = formElements.emailField.value;
            const phone = formElements.phoneField.value;

            const firstNameError = document.querySelector('.error.f-name');
            const lastNameError = document.querySelector('.error.l-name');
            const emailError = document.querySelector('.error.email');
            const phoneError = document.querySelector('.error.tel');

            const isNotEmpty = (value) => value.trim() !== '';
            const isMinLength = (value, minLength) => value.length >= minLength;
            const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const isPhoneValid = (phone) => /^\d+$/.test(phone);

            const isValidFirstName = isNotEmpty(firstName) && isMinLength(firstName, 2);
            const isValidLastName = isNotEmpty(lastName) && isMinLength(lastName, 2);
            const isValidEmail = isNotEmpty(email) && isEmailValid(email);
            const isValidPhone = isNotEmpty(phone) && isPhoneValid(phone);

            if (!isValidFirstName) {
                firstNameError.style.display = 'block'
            }

            if (!isValidLastName) {
                lastNameError.style.display = 'block'
            }

            if (!isValidEmail) {
                emailError.style.display = 'block'
            }

            if (!isValidPhone) {
                phoneError.style.display = 'block';
            }


            isValid = isValidFirstName && isValidLastName && isValidEmail && isValidPhone;
            return isValid;
        };
        validForm();
        ////////////////////////////

        if (isValid) {
            // document.querySelector(".loader-sub").style.display = "flex";
           const spinner =  document.querySelector(".loader-spinner ");
            // spinner.style.display = "flex";
            submitBtn.innerHTML = '<div id="loader-spinner" class="loader-spinner"></div>';
            submitBtn.disabled = true;
            const countdownElement = document.getElementById('countdown');
            let seconds = 3;

            // Disable back button
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, null, window.location.href);
            };

            const updateCountdown = () => {
                countdownElement.textContent = seconds;
                if (seconds === 0) {
                    // document.getElementById('loader-sub').style.display = 'none';
                    document.getElementById('loader-spinner').style.display = 'none';
                    submitBtn.textContent = 'START RECOVERY'
                    // Re-enable back button
                    window.onpopstate = null;
                } else {
                    seconds--;
                    setTimeout(updateCountdown, 1000);
                }
            };

            setTimeout(updateCountdown, 1000);


            event.preventDefault();
            sendLeadData(event, form, formElements, selectedValues);
        }
    });


    // form.addEventListener('submit', (event) => {
    //     document.querySelector(".loader-sub").style.display = "flex";
    //     const countdownElement = document.getElementById('countdown');
    //     let seconds = 3;
    //
    //     const updateCountdown = () => {
    //         countdownElement.textContent = seconds;
    //         if (seconds === 0) {
    //             document.getElementById('loader-sub').style.display = 'none';
    //         } else {
    //             seconds--;
    //             setTimeout(updateCountdown, 1000);
    //         }
    //     };
    //
    //     setTimeout(updateCountdown, 1000);
    //     console.log('click');
    //     event.preventDefault();
    //
    //     sendLeadData(event, form, formElements);
    // });

});


