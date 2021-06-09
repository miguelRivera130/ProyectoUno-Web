
const params = new URLSearchParams(location.search);
const id = params.get('id');

const productName = document.querySelector('.productInfo__name');
const productPrice = document.querySelector('.productInfo__price');
const productAutor = document.querySelector('.productInfo__autor');
const productCamera = document.querySelector('.productInfo__camera');
const productType = document.querySelector('.productInfo__type');
const productConfig = document.querySelector('.productInfo__config');
const productDescription = document.querySelector('.productInfo__descriptionSesion');
const productImages = document.querySelector('.productInfo__images');

db.collection('products')
    .doc(id)
    .get()
    .then(function (doc) {
        const data = doc.data();
        console.log(doc.id, doc.data());

        productName.innerText = data.name;
        productPrice.innerHTML = `<strong>Precio:</strong> $ ${data.price}`;
        productAutor.innerHTML = `<strong>Autor:</strong> ${data.author}`
        productCamera.innerHTML = `<strong>Camara:</strong> ${data.cameraType}`;
        productConfig.innerHTML = `<strong>Configuración:</strong> ${data.configuration}`;
        productDescription.innerHTML = `${data.description}`;

        switch (data.sessionType) {
            case 'nature':
                productType.innerHTML = `<strong>Tipo:</strong> Espacio abierto`;
                break;
            case 'studio':
                productType.innerHTML = `<strong>Tipo:</strong> Estudio`;
                break;
            case 'product':
                productType.innerHTML = `<strong>Tipo:</strong> Producto`;
                break;
        }

    });


const handleCollectionResult = function (querySnapshot) {
    productImages.innerHTML = '';
    querySnapshot.forEach(function (doc, index) {
        const data = doc.data();
        const productInfo = document.createElement('div');
        let img = data.images[i].url;
        productInfo.innerHTML = `
            <div class="product">

                <img class="productInfo__img" src="${img}" alt="">

            </div>
    
            `;
        list.appendChild(product);

    });
};
