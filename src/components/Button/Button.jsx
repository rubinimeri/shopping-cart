import PropTypes from "prop-types"
import styles from "./Button.module.css"

function Button({ handleClick, children, classes}) {
    return(
        <button 
         className={`${classes ? classes : ''} ${styles.button}`}
         onClick={handleClick}>
            {children}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    children: PropTypes.array,
    classes: PropTypes.string
}

export default Button