import styles from './CartItem.module.css'
import PropTypes from 'prop-types'

function CartItem(props) {
    const { image, title, price, id, quantity } = props

    const { 
        handleRemoveFromCart,  
        handleQuantityIncrement, 
        handleQuantityDecrement,
        handleQuantityChange
    } = props;


    return(
        <div className={styles.cartItem}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} />
                <h2>{title.toUpperCase()}</h2>
            </div>
            <div className={styles.quantity}>
                <h3>{(price * quantity).toFixed(2)}€</h3>
                <div className={styles.qty}>
                    <div className={styles.qtyInput}>
                        <button
                        disabled={quantity === 1 ? true : false}
                        onClick={() => handleQuantityDecrement(id)}>-</button>
                        <input 
                        value={quantity}
                        onChange={(e) => {
                            const { value } = e.target;
                            handleQuantityChange(id, value);
                        }}
                        type="tel" 
                        name="quantity" 
                        id={id} />
                        <button
                        onClick={() => handleQuantityIncrement(id)}>+</button>
                    </div>
                    <button
                    onClick={() => handleRemoveFromCart(id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    id: PropTypes.number,
    handleRemoveFromCart: PropTypes.func,  
    handleQuantityIncrement: PropTypes.func, 
    handleQuantityDecrement: PropTypes.func,
    handleQuantityChange: PropTypes.func
}

export default CartItem