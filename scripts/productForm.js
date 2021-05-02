
var firebaseConfig = {
    apiKey: "AIzaSyA-G5ZZ4eH9TJonqNCK3VHxEUXrzht3rQA",
    authDomain: "do-proyecto-web.firebaseapp.com",
    projectId: "do-proyecto-web",
    storageBucket: "do-proyecto-web.appspot.com",
    messagingSenderId: "724123121935",
    appId: "1:724123121935:web:a450dd126e4e1e7e3d667a",
    measurementId: "G-H2JKK223WD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const productForm = document.querySelector('.productForm');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormloader = document.querySelector('.productForm__loader');
const productFormError = document.querySelector('.productForm__error');
const productFormImage = document.querySelector('.productForm__image');
const productFormImages = document.querySelector('.productForm__images');

const imageFiles = [];

productForm.image.addEventListener('change', function () {

    const file = productForm.image.files[0];
    if (!file) {

        productFormImage.classList.add('hidden');
        return;

    }

    const reader = new FileReader();
    reader.onload = function (event) {

        const productFormImage = document.createElement('img')
        productFormImage.classList.add('productForm__image');
        productFormImage.setAttribute('src', event.target.result);
        productFormImages.appendChild(productFormImage);

    }

    reader.readAsDataURL(file);
    imageFiles.push(file);

});

productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const product = {

        name: productForm.name.value,
        author: productForm.author.value,
        cameraType: productForm.cameraType.value,
        sessionTypes: [],
        configuration: productForm.configuration_lens.value + ' ' + productForm.configuration_length.value + '\n' + productForm.configuration_iso.value + ' ' + productForm.configuration_exposition.value,
        price: parseFloat(productForm.price.value),
        description: productForm.description.value

    }



    if (productForm.sessionType_e.checked) product.sessionTypes.push('Estudio');
    if (productForm.sessionType_eA.checked) product.sessionTypes.push('Espacio abierto');
    if (productForm.sessionType_p.checked) product.sessionTypes.push('Producto');

    productFormError.classList.add('hidden');
    productFormloader.classList.remove('hidden');

    if (!product.name || !product.author || !product.cameraType || !product.description || !product.price) {

        productFormError.innerText = 'Es necesario que complete toda la informacion para subir el producto';
        productFormError.classList.remove('hidden');
        // return;

    }

    productFormSuccess.classList.add('hidden');
    productFormloader.classList.remove('hidden');

    //subida de informacion a firestore
    db.collection('products').add(product).then(function (docRef) {

        const uploadPromises = [];
        const downloadURLPromises = [];

        //prolemas con imageFiles ARREGLAR

        imageFiles.forEach(function (file) {
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

            //subida de imagen
            uploadPromises.push(fileRef.put(file));
        });
        console.log(imageFiles);

        Promise.all(uploadPromises).then(function (snapshots) {

            snapshots.forEach(function (snapshot) {

                //obtencion del url de cada imagen
                downloadURLPromises.push(snapshot.ref.getDownloadURL());
            });

            Promise.all(downloadURLPromises).then(function (downloadURLs) {

                const images = [];
                downloadURLs.forEach(function (url, index) {
                    images.push({
                        url: url,
                        ref: snapshots[index].ref.fullPath
                    });
                });

                db.collection('products').doc(docRef.id).update({
                    images: images
                }).then(function () {
                    productFormSuccess.classList.remove('hidden');
                    productFormloader.classList.add('hidden');
                });
            });

        });
    }).catch(function (error) {
        productFormError.innerText = 'Ocurrió un error durante la subida del producto, intentelo nuevamente';
        productFormloader.classList.add('hidden');
        productFormError.classList.remove('hidden');
    });

});
