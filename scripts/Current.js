const current = document.querySelector('.membership__current');
const thumbs = document.querySelectorAll('.membership__thumb');
const srcName = document.querySelector('.membership__name');
const srcDescription = document.querySelector('.membership__description');
const img = document.querySelector('.membership__img');
let thumb;

for (let i = 0; i < thumbs.length; i++) {

    let thumb = thumbs[i];
    let src = thumb.getAttribute('for');
    let srcImg;

    function handleThumbClick() {

        switch (src) {

            case "radioOne":
                srcImg = "./data/membership.jpg"
                img.setAttribute('src', srcImg);
                srcName.innerHTML = 'Membresia';
                srcDescription.innerHTML = 'Conviértete en miembro para mantener una base de datos para la realización de múltiples proyectos con tus características y gustos además de conseguir descuentos en sesiones y estudios a la venta.';
                break;
                
            case "radioTwo":
                srcImg = "./data/newsletter.jpg"
                img.setAttribute('src', srcImg);
                srcName.innerHTML = 'Suscripción';
                srcDescription.innerHTML = 'Suscribe tu correo electronico para enterarte de primera mano todas las novedades en cuanto a servicios y productos presentes en la pagina.';
                break;

        }

    }

    thumb.addEventListener('click', handleThumbClick);
}



