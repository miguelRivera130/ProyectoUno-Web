const list = document.querySelector('.cartList');
const send = document.querySelector('.Diaphragm__filters');
const totalspan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');

let total = 0;

cart.forEach((data, index) => {

    const product = document.createElement('div');
    let img = data.images[0]?.url;
    product.classList.add('cartProduct');
    product.innerHTML = `
        <img class="cartProduct__img" src="${img}" alt="">

        <div class="cartProduct__info">

            <h2 class="cartProduct__name">${data.name}</h2>
            <p><strong>Autor: </strong>${data.author}</p>
            
            <h3 class="cartProduct__price">$ ${data.price}</h3>
        </div>

        <button class="cartProduct__del "><strong>X</strong></button>
    
        `;
    list.appendChild(product);
    totalspan.innerText = total;
    total += data.price;

    const delBtn = product.querySelector('.cartProduct__del');
    delBtn.addEventListener('click', function () {
        cart.splice(index, 1);
        localStorage.setItem('item__cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    });

});

checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productsIds = [];
    cart.forEach((data) => {
        productsIds.push(data.id);
    });

    const order = {
        ccNumber: checkoutForm.ccnumber.value,
        ccName: checkoutForm.ccname.value,
        ccDate: checkoutForm.ccdate.value,
        cvc: checkoutForm.cvc.value,
        date: Date.now(),
        productsIds: productsIds,
        total: total,
        uid: loggedUser.uid
    };

    if (!order.ccNumber || !order.ccName || !order.ccDate || !order.cvc) {

        alert("Es necesario que complete toda la informacion para pagar");
        return;

    }

    db.collection('orders').add(order)
    .then(function (docRef) {
        console.log(docRef.id);
        alert("compra realizada satisfactoriamente");
        localStorage.clear();
    });

    console.log(order);

});

