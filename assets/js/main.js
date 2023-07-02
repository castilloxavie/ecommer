import getProducts from "./components/helper/getProducts.js"
import loader from "./components/loader.js"
import products from "./components/products.js"
import showCart from "./components/showCart.js"
import showMenu from "./components/showMenu.js"


/*UI Element */
/* Ocultar louder */
loader()

/* Mostar el Menu*/
showMenu()

/*Mostrar el carrito*/
showCart()

/* End UI Elements*/

/* products*/
products(await getProducts())