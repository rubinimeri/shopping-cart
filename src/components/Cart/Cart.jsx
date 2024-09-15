import CartItem from '../CartItem/CartItem'
import PropTypes from 'prop-types'
import styles from './Cart.module.css'

function Cart({ cart, setCart, cartVisibility, handleCartVisibilityChange }) {
    function getTotalCost() {
        return (
            cart
            .map(product => parseInt(product.price) * product.quantity)
            .reduce((a, b) => a + b)
            .toFixed(2)
        )
    }

    function handleRemoveFromCart(id) {
        setCart(cart.filter(product => product.id !== id))
    }

    function handleCartOperations(currentProduct, operationType, value) {
        currentProduct.quantity = 
            operationType === 'decrement' ?
            currentProduct.quantity - 1 :
            operationType === 'increment' ?
            currentProduct.quantity + 1 :
            parseInt(value)
        
        const cartClone = [...cart];
        const productIndex = cart.findIndex(product => product.id === currentProduct.id);
        cartClone[productIndex] = currentProduct;

        setCart([...cartClone]);
    }

    function handleQuantityChange(id, value) {
        if(value === '' || value <= 0) return

        const product = cart.find(product => product.id === id);
        const OPERATION_TYPE = 'change';
        handleCartOperations(product, OPERATION_TYPE, value)
    }

    function handleQuantityIncrement(id) {
        const product = cart.find(product => product.id === id);
        const OPERATION_TYPE = 'increment';
        handleCartOperations(product, OPERATION_TYPE)
    }

    function handleQuantityDecrement(id) {
        const product = cart.find(product => product.id === id);
        const OPERATION_TYPE = 'decrement';
        handleCartOperations(product, OPERATION_TYPE);
    }

    return (
        <div className={`${styles.cart} ${cartVisibility ? styles.cartVisible : styles.cartHidden}`}>
            <div className={styles.flex}>
                <p>Cart ({cart.length})</p>
                <button onClick={handleCartVisibilityChange}><i className="fa-solid fa-x"></i></button>
            </div>
            <div className={styles.cartItems}>
                {cart
                    .map(item => 
                        <CartItem 
                        key={item.id}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleQuantityIncrement={handleQuantityIncrement}
                        handleQuantityDecrement={handleQuantityDecrement}
                        handleQuantityChange={handleQuantityChange}
                        {...item} />
                    )}
            </div>
            <div className={styles.buy}>
                <p>Free delivery to a relay point! Only €7.00 more for free home delivery</p>
                <div className={styles.flex}>
                    <p>SHIPPING COSTS</p>
                    <p>CALCULATED AT CHECKOUT</p>
                </div>
                <button className={styles.buyButton}>ORDER - €{cart.length > 0 ? getTotalCost() : 0}</button>
            </div>
        </div>
    );
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object),
    setCart: PropTypes.func,
    cartVisibility: PropTypes.bool,
    handleCartVisibilityChange: PropTypes.func
}


export default Cart