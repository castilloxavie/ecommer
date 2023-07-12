function cart(db, printProducts) {
    let cart = []

    // Elementos del DOM
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartBodyDOM = document.querySelector('.cart_body')
    const cartCountTextDOM = document.querySelector('.cart_count--item')
    const cartTotalItemDOM = document.querySelector('.cart_total--item')
    const btnBuyDOM = document.querySelector('.btn--buy')

    // Funciones

    function printCart () {
        let htmlCart = ''

        if (cart.length === 0) {
            htmlCart = `
            <div class="cart_empty">
                <i class="bx bxs-cart"></i> 
                <p class="cart_empty-text">No hay productos en el carrito</p>
            </div>
            `
            notifyDOM.classList.remove('show--notify')
        }else {
            for (const item of cart){
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                    <article class="article">
                        <div class="article_img">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="article_content">
                            <h3 class="article_title">${product.name}</h3>
                            <span class="article_price">${product.price}</span>
                        <div class="article_quantity">
                            <button type="button" class="articlequantity-btn article_minus" data-id ="${item.id}">
                                <i class="bx bx-minus"></i>
                            </button>
                            <span class="article_quantity-text">${item.qty}</span>
                            <button type="button" class="articlequantity-btn article_plus" data-id ="${item.id}">
                                <i class="bx bx-plus"></i>
                            </button>
                        </div>
                        <button type="button" class="article_btn remove-from-cart" data-id ="${item.id}">
                            <i class="bx bx-trash"></i>
                        </button>
                        </div>
                    </article>
                `
            }
            notifyDOM.classList.add('show--notify')
        }
        
        cartBodyDOM.innerHTML = htmlCart
        notifyDOM.innerHTML = showItemsCount()
        cartCountTextDOM.innerHTML = showItemsCount()
        cartTotalItemDOM.innerHTML = showTotal()
    }

    function addToCart(id, qty = 1) {
        const itemFider = cart.find(i => i.id === id)

        if (itemFider) {
            itemFider.qty += qty
        } else {
            cart.push({id, qty})
        }


        printCart ()
    }
    

    function removeFromCart(id, qty = 1) {
        const itemFider = cart.find(i => i.id === id)
        const result = itemFider.qty - qty

        if (result  > 0 ) {
            itemFider.qty -= qty
        } else {
            cart = cart.filter(i => i.id != id)
        } 
        printCart ()
        
    }

    // removeFromCart()

    function deleteFromCart(id) {
        cart = cart.filter(i => i.id != id)

        printCart()
    }

    

    function  showItemsCount() {
        let suma = 0

        for (const item of cart){
            suma += item.qty
        }
        return suma
    }

    function showTotal() {
        let total = 0

        for(const item of cart){
            const productsFainder = db.find(p => p.id === item.id)
            total += item.qty * productsFainder.price
        }
        return total
    }

    function checkuot() {
        for (const item of cart){
            const productsFainder = db.find(p => p.id === item.id)
            productsFainder.quantity -= item.qty
        }

        cart = []
        printCart()
        printProducts()
        window.alert('Gracias por su compra')
    }

    // Eventos
    productsDOM.addEventListener('click', function (evento) {
        if (evento.target.closest('.add--to--cart')) {
            const id = +evento.target.closest('.add--to--cart').dataset.id
            addToCart(id)
        }
    })

    cartBodyDOM.addEventListener('click', function(evento){
        if (evento.target.closest('.article_minus')) {
            const id = +evento.target.closest('.article_minus').dataset.id
            removeFromCart(id)
        }

        if (evento.target.closest('.article_plus')) {
            const id = +evento.target.closest('.article_plus').dataset.id
            addToCart(id)
        }

        if (evento.target.closest('.remove-from-cart')) {
            const id = +evento.target.closest('.remove-from-cart').dataset.id
            deleteFromCart(id)
        }

        
    })

    btnBuyDOM.addEventListener('click', function(evento){
        checkuot()
    })
}

export default cart