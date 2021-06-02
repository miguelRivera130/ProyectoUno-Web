const list = document.querySelector('.list');
const filters = document.querySelector('.Diaphragm__filters');

const handleCollectionResult = function (querySnapshot) {
    list.innerHTML = '';
    querySnapshot.forEach(function (doc) {
        const data = doc.data();
        const product = document.createElement('div');
        let img = data.images[0]?.url;
        product.innerHTML = `
        <div class="product">
          <a class="product__data" href="./product.html?id=${doc.id}&name=${data.name}">
            <img class="product__img" src="${img}" alt="">
            <div class="product__info">
            <h2 class="product__name">${data.name}</h2>
            <h3 class="product__price">$ ${data.price}</h3>

            <p><strong>Autor: </strong>${data.author}</p>
            <p><strong>Camara: </strong>${data.cameraType}</p>
            <p><strong>Tipo de sesión: </strong>${data.sessionType}</p>
            <p><strong>Configuración: </strong>${data.configuration}</p>

            </div>
          </a>
          <div class="product__buttons">
          <button class="hidden showLoggedAdmin showLoggedAdmin--del">Eliminar</button>
           <button class="button button--item"> Agregar al carrito </button>
          </div>
        </div>

        `;
        list.appendChild(product);

        const cartBtn = product.querySelector('.button--item');
        cartBtn.addEventListener('click', function () {
            cart.push(data);
            localStorage.setItem('item__cart', JSON.stringify(cart));
            cartBtnNumber.innerText = cart.length;
        });

        const delBtn = product.querySelector('.showLoggedAdmin--del');
        delBtn.addEventListener('click', function () {
            data.ref("products/" + doc.id).set(null);
        })

    });
};

filters.addEventListener('change', function () {

    let productsCollection = db.collection('products');
    console.log(filters.type.value);

    if (filters.type.value) {
        productsCollection = productsCollection.where('sessionType', '==', filters.type.value);
    }

    if (filters.camera.value) {
        productsCollection = productsCollection.where('cameraType', '==', filters.camera.value);
    }

    if (filters.price.value) {

        console.log(filters.price.value);
        switch (filters.price.value) {

            case 'cheap':
                productsCollection = productsCollection.where('price', '<', 250000);
                break;
            case 'medium':
                productsCollection = productsCollection.where('price', '>=', 250000);
                productsCollection = productsCollection.where('price', '<', 450000);
                break;
            case 'expensive':
                productsCollection = productsCollection.where('price', '>=', 450000);
                break;
        };
    }

    if (filters.order.value) {
        switch (filters.order.value) {

            case 'price_des':
                productsCollection = productsCollection.orderBy('price', 'desc');
                break;
            case 'price_asc':
                productsCollection = productsCollection.orderBy('price', 'asc');
                break;
            case 'alpha_asc':
                productsCollection = productsCollection.orderBy('name', 'asc');
                break;
        };
    };

    productsCollection.get().then(handleCollectionResult);
});

db.collection('products').get().then(handleCollectionResult);