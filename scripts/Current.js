const current = document.querySelector('.membership__current');
const thumbs = document.querySelectorAll('.membership__thumb');
const srcName = document.querySelector('.membership__name');
const srcDescription = document.querySelector('.membership__description');
const srcBenefitTwo = document.querySelector('.membership__benefitTwo');
const srcBenefitThree = document.querySelector('.membership__benefitThree');
const srcBenefitFour = document.querySelector('.membership__benefitFour');
const img = document.querySelector('.membership__img');
const button = document.querySelector('button--membership');
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
                srcBenefitTwo.innerHTML = 'Descuentos y prioridad en la organización de sesiones.';
                srcBenefitThree.innerHTML = 'Disponibilidad en la selección de modelos.';                
                srcBenefitFour.innerHTML = 'Descuentos y acceso a la compra de proyectos limitados.';
                break;
                
            case "radioTwo":
                srcImg = "./data/newsletter.jpg"
                img.setAttribute('src', srcImg);
                srcName.innerHTML = 'Suscripción';
                srcDescription.innerHTML = 'Suscribe tu correo electrónico para enterarte de primera mano todas las novedades en cuanto a servicios y productos presentes en la pagina.';                
                srcBenefitTwo.innerHTML = '';
                srcBenefitThree.innerHTML = '';
                srcBenefitFour.innerHTML = '';
                break;

        }

    }

    thumb.addEventListener('click', handleThumbClick);
}



