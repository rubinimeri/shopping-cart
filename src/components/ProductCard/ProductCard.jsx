import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

function ProductCard({ image, price, title, description, id, handleAddToCart}) {

  return (
    <Link 
    id={id} 
    className={styles.productLink} 
    to={`/product/${id}`}>
      <div>
        <h3 className={styles.title}>{title.toUpperCase()}</h3>
      </div>
      <img src={image} alt={description} className={styles.image} />
      <div className={styles.buttonContainer}><button onClick={handleAddToCart}>ADD - {price}$</button></div>
    </Link>
  );
}

ProductCard.propTypes = {
  image: PropTypes.PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  handleAddToCart: PropTypes.func
};

export default ProductCard;
