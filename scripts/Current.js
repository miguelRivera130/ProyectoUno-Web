const current = document.querySelector('.membership__current');
const thumbs = document.querySelectorAll('.membership__thumb');
const membership = document.querySelector('.memberhip');
const img = document.querySelector('.membership__img');
let thumb;

for (let i = 0; i < thumbs.length; i++) {

    thumb = thumbs[i];

    thumb.addEventListener('check', handleThumbClick);

}

function handleThumbClick() {

    switch (thumb) {

        case 0:
            let characterN = "Suscription"
            break;

        case 1:
            
            let characterImg = "./data/newsletter.jpg";
            img.setAttribute('src', characterImg);
            
            let characterN = "Suscription";
            membership.setAttribute('&__name', characterN);

            let characterDescription = "suscribe tu correo para mantener contacto para directo y agil sobre cualquier novedad de la pagina"
            membership.setAttribute('&__description')
            break;

    }

}

