function products(products) {
    const db = [...products]

    function printProducts() {
        const productsDOM = document.querySelector('.products__container')
        let htmlProducts = ''

        for (let product of db) {
            htmlProducts += `
            <article class="product">
                    <div class="product__img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product__content">
                        <button type="button" class="prduct__btn add--to--cart" data-id="${product.id}">
                            <i class='bx bxs-cart'></i>
                        </button>
                        <span class="product__price">${product.price}</span>
                        <span class="product__stock">Disponible: ${product.quantity}</span>
                        <h3 class="product_title">${product.name}</h3>

                    </div>
                </article>
            `
        }
        productsDOM.innerHTML = htmlProducts
    }
    printProducts()

    return {
        db,
        printProducts
    }
}

export default products