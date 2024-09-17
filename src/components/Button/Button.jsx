import PropTypes from "prop-types"
import styles from "./Button.module.css"

function Button({ handleClick, isDisabled, children, classes}) {
    return(
        <button 
         disabled={isDisabled}
         className={`${classes ? classes : ''} ${styles.button}`}
         onClick={handleClick}>
            {children}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    classes: PropTypes.string
}

export default Button