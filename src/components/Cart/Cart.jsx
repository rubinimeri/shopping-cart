import CartItem from '../CartItem/CartItem'
import Button from '../Button/Button'
import PropTypes from 'prop-types'
import styles from './Cart.module.css'

function Cart({ state, dispatch, cartVisibility, handleCartVisibilityChange }) {
    function getTotalCost() {
        return (
            state.cart
            .map(product => parseInt(product.price) * product.quantity)
            .reduce((a, b) => a + b)
            .toFixed(2)
        )
    }

    return (
        <div className={`${styles.cart} ${cartVisibility ? styles.cartVisible : styles.cartHidden}`}>
            <div className={styles.flex}>
                <p>Cart ({state.cart.length})</p>
                <button onClick={handleCartVisibilityChange}><i className="fa-solid fa-x"></i></button>
            </div>
            <div className={styles.cartItems}>
                {state.cart
                    .map(item => 
                        <CartItem 
                        key={item.id}
                        handleRemoveFromCart={(id) => dispatch({ type: "deleted_product", productId: id })}
                        handleQuantityIncrement={(id) => dispatch({ type: "incremented_product_quantity", productId: id })}
                        handleQuantityDecrement={(id) => dispatch({ type: "decremented_product_quantity", productId: id })}
                        handleQuantityChange={(id, value) => dispatch({ type: "changed_product_quantity", productId: id, quantity: value })}
                        product={item} />
                    )}
            </div>
            <div className={styles.buy}>
                <p>Free delivery to a relay point! Only €7.00 more for free home delivery</p>
                <div className={styles.flex}>
                    <p>SHIPPING COSTS</p>
                    <p>CALCULATED AT CHECKOUT</p>
                </div>
                <Button classes={styles.buyButton}>
                    ORDER - €{state.cart.length > 0 ? getTotalCost() : 0}
                </Button>
            </div>
        </div>
    );
}

Cart.propTypes = {
    state: PropTypes.object,
    dispatch: PropTypes.func,
    cartVisibility: PropTypes.bool,
    handleCartVisibilityChange: PropTypes.func
}


export default Cart