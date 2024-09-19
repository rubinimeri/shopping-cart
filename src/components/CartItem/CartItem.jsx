import QuantitySelector from '../QuantitySelector/QuantitySelector'
import styles from './CartItem.module.css'
import PropTypes from 'prop-types'

function CartItem(props) {
    const { product } = props;

    const { 
        handleRemoveFromCart,  
        handleQuantityIncrement, 
        handleQuantityDecrement,
        handleQuantityChange
    } = props;

    const handleChange = (e) => {
        const { value } = e.target;

        if(value === '') 
            handleQuantityChange(product.id, 0);
        else if(isNaN(parseInt(value)))
            return
        else
            handleQuantityChange(product.id, parseInt(value));
     }

    return(
        <div className={styles.cartItem}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} />
                <h2>{product.title.toUpperCase()}</h2>
            </div>
            <div className={styles.quantity}>
                <h3>{(product.price * product.quantity).toFixed(2)}€</h3>
                <div className={styles.qty}>
                    <div className={styles.qtyInput}>
                        <QuantitySelector
                         handleDecrement={() => handleQuantityDecrement(product.id)}
                         handleIncrement={() => handleQuantityIncrement(product.id)}
                         handleChange={handleChange}
                         width='150px'
                        >
                            {product.quantity}
                        </QuantitySelector>
                    </div>
                    <button
                    onClick={() => handleRemoveFromCart(product.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    product: PropTypes.object,
    handleRemoveFromCart: PropTypes.func,  
    handleQuantityIncrement: PropTypes.func, 
    handleQuantityDecrement: PropTypes.func,
    handleQuantityChange: PropTypes.func
}

export default CartItem