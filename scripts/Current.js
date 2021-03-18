const services = document.querySelectorAll('.service');
const thumbs = document.querySelectorAll('.service__thumb');
let sizeId;

//zoom img
for (let i = 0; i < services.length; i++) {

    let thumb = thumbs[i]
    service = services[i]

    function handleZoomInterval() {
        thumb.style.transform = `scale( 1.5, 1.5)`;
    }

    function handleThumbEnter() {
        sizeId = setInterval(handleZoomInterval, 0500);

    }

    service.addEventListener('mouseenter', handleThumbEnter);

    function handleThumbLeave() {
        clearInterval(sizeId);
        thumb.style.transform = `scale( 1, 1)`
    }

    service.addEventListener('mouseleave', handleThumbLeave);
}
