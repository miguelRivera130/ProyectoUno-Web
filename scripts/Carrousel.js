//slide carrousel
const items = document.querySelectorAll('.item');
const sliders = document.querySelectorAll('.item__slider');
let currentSlide = 0;
let intervalId;

for (let i = 0; i < items.length; i++) {

    item = items[i];
    let slider = sliders[i]

    function handleMouseEnter() {
        intervalId = setInterval(handleInterval, 1500);
    }

    item.addEventListener('mouseenter', handleMouseEnter);

    function handleMouseLeave() {
        clearInterval(intervalId);
        currentSlide = 0;
        slider.style.transform = 'translate( 0px, 0px)';
    }

    item.addEventListener('mouseleave', handleMouseLeave);

}