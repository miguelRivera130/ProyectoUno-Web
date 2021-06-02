const list = document.querySelector('.cartList');
let total = 0;

cart.forEach((data) => {
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
    
        `;
    list.appendChild(product);
    total += data.price;
});