// document.addEventListener("DOMContentLoaded", function () {
//     var stepper = document.querySelector('.stepper');
//     var dotsContainer = document.getElementById('dotsContainer');
//     var dots = dotsContainer.querySelectorAll('.dot');
//     var stepText = document.getElementById('stepText');
//
//     var currentStep = 1;
//
//     function updateStepText() {
//         stepText.textContent = "Крок " + currentStep + " з 4";
//     }
//
//     function updateDots() {
//         dots.forEach(function (dot, index) {
//             dot.classList.toggle('active', index + 2 === currentStep);
//         });
//     }
//
//     function showHideDots() {
//         dotsContainer.style.display = currentStep === 1 || currentStep === 5 ? 'none' : 'flex';
//     }
//
//     function navigateToSlide(slide) {
//         var slides = document.querySelectorAll('.step');
//
//         if (slides[slide - 1]) {
//             slides.forEach(function (s) {
//                 s.classList.remove('active');
//             });
//
//             slides[slide - 1].classList.add('active');
//
//             currentStep = slide;
//             updateStepText();
//             updateDots();
//             showHideDots();
//         }
//     }
//
//     stepper.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'A' && target.id === 'startButton') {
//             navigateToSlide(2); // Перехід на другий слайд при кліку на "Start"
//         } else if (target.tagName === 'LI' && currentStep !== 5) {
//             navigateToSlide(currentStep + 1);
//         }
//     });
//
//     dotsContainer.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
//             var slide = Array.from(dots).indexOf(target) + 2;
//             navigateToSlide(slide);
//         }
//     });
//
//     // Початкова настройка
//     updateStepText();
//     updateDots();
//     showHideDots();
// });


// document.addEventListener("DOMContentLoaded", function () {
//     var stepper = document.querySelector('.stepper');
//     var dotsContainer = document.getElementById('dotsContainer');
//     var dots = dotsContainer.querySelectorAll('.dot');
//     var stepText = document.getElementById('stepText');
//
//     var currentStep = 1;
//
//     function updateStepText() {
//         var totalSteps = 3;
//         var displayedStep = currentStep - 1; // Крок відображається з 0 на 2 слайді
//
//         stepText.textContent = "Крок " + (displayedStep) + " з " + totalSteps;
//     }
//
//     function updateDots() {
//         dots.forEach(function (dot, index) {
//             dot.classList.toggle('active', index + 2 === currentStep);
//         });
//     }
//
//     function showHideDots() {
//         dotsContainer.style.display = currentStep === 1 || currentStep === 5 ? 'none' : 'flex';
//     }
//
//     function navigateToSlide(slide) {
//         var slides = document.querySelectorAll('.step');
//
//         if (slides[slide - 1]) {
//             slides.forEach(function (s) {
//                 s.classList.remove('active');
//             });
//
//             slides[slide - 1].classList.add('active');
//
//             currentStep = slide;
//             updateStepText();
//             updateDots();
//             showHideDots();
//         }
//     }
//
//     stepper.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'A' && target.id === 'startButton') {
//             navigateToSlide(2); // Перехід на другий слайд при кліку на "Start"
//         } else if (target.tagName === 'LI' && currentStep !== 5) {
//             navigateToSlide(currentStep + 1);
//         }
//     });
//
//     dotsContainer.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
//             var slide = Array.from(dots).indexOf(target) + 2;
//             navigateToSlide(slide);
//         }
//     });
//
//     // Початкова настройка
//     updateStepText();
//     updateDots();
//     showHideDots();
// });


// document.addEventListener("DOMContentLoaded", function () {
//     var stepper = document.querySelector('.stepper');
//     var dotsContainer = document.getElementById('dotsContainer');
//     var dots = dotsContainer.querySelectorAll('.dot');
//     var stepText = document.getElementById('stepText');
//     var selectedValues = {}; // Об'єкт для збереження вибраних значень
//
//     var currentStep = 1;
//
//     function updateStepText() {
//         var totalSteps = 3;
//         var displayedStep = currentStep - 1;
//
//         stepText.textContent = "Крок " + displayedStep + " з " + totalSteps;
//     }
//
//     function updateDots() {
//         dots.forEach(function (dot, index) {
//             dot.classList.toggle('active', index + 2 === currentStep);
//         });
//     }
//
//     function showHideDots() {
//         dotsContainer.style.display = currentStep === 1 || currentStep === 5 ? 'none' : 'flex';
//     }
//
//     function navigateToSlide(slide) {
//         var slides = document.querySelectorAll('.step');
//
//         if (slides[slide - 1]) {
//             if (currentStep === 4 && slide === 5) {
//                 console.log("Всі збережені дані:", selectedValues);
//             }
//
//             slides.forEach(function (s) {
//                 s.classList.remove('active');
//             });
//
//             slides[slide - 1].classList.add('active');
//
//             currentStep = slide;
//             updateStepText();
//             updateDots();
//             showHideDots();
//         }
//     }
//
//     // Функція для збереження значення при кліку на li
//     function saveSelectedValue() {
//         var h2Text = this.closest('.step').querySelector('h2').textContent;
//         var liText = this.textContent;
//         selectedValues[h2Text] = liText;
//     }
//
//     stepper.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'A' && target.id === 'startButton') {
//             navigateToSlide(2);
//         } else if (target.tagName === 'LI' && currentStep !== 5) {
//             saveSelectedValue.call(target);
//             navigateToSlide(currentStep + 1);
//         }
//     });
//
//     dotsContainer.addEventListener('click', function (event) {
//         var target = event.target;
//
//         if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
//             var slide = Array.from(dots).indexOf(target) + 2;
//             navigateToSlide(slide);
//         }
//     });
//
//     // Початкова настройка
//     updateStepText();
//     updateDots();
//     showHideDots();
// });


document.addEventListener("DOMContentLoaded", () => {
    const stepper = document.querySelector('.stepper');
    const dotsContainer = document.getElementById('dotsContainer');
    const dots = dotsContainer.querySelectorAll('.dot');
    const stepText = document.getElementById('stepText');
    const selectedValues = {}; // Об'єкт для збереження вибраних значень

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
                console.log("Всі збережені дані:", selectedValues);
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

    // Функція для збереження значення при кліку на li
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

    // Початкова настройка
    updateStepText();
    updateDots();
    showHideDots();
});
