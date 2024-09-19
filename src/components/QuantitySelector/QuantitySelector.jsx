import PropTypes from "prop-types"
import styles from './QuantitySelector.module.css'

function QuantitySelector({ handleIncrement, handleChange, handleDecrement, children, width = '100px' }) {
    return(
        <div 
         style={{maxWidth: width}}
         className={styles.quantitySelector}>
            <button disabled={isNaN(children) || children <= 1} onClick={handleDecrement}> - </button>
            <input 
             type="tel"
             value={children} 
             onChange={handleChange}
            />
            <button disabled={isNaN(children)} onClick={handleIncrement}> + </button>
        </div>
    )
}

QuantitySelector.propTypes = {
    handleIncrement: PropTypes.func,
    handleDecrement: PropTypes.func,
    handleChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    width: PropTypes.string,
}

export default QuantitySelector